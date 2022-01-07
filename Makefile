include common.mk
include custom.mk

.PHONY: default
default: help

.PHONY: help
help: ## Show make targets
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {sub("\\\\n",sprintf("\n%22c"," "), $$2);printf " \033[36m%-20s\033[0m  %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.PHONY: build-base
build-base: ## Build base image
	@DOCKER_BUILDKIT=1 \
	docker build . \
		  -f docker/Dockerfile.base \
		  --build-arg	REGISTRY=$(DOCKER_CI) \
		  --build-arg AIRTABLE_KEY=$(AIRTABLE_KEY) \
		  -t $(DOCKER_CI)/$(IMAGE_NAME):dev

.PHONY: push-base
push-base: ## push the built base image
	@docker push $(DOCKER_CI)/$(IMAGE_NAME):dev

.PHONY: pull-base
pull-base: ## getting base image and jinja image
	docker pull $(DOCKER_CI)/$(IMAGE_NAME):dev
	docker pull $(DOCKER_CI)/jinja:$(JINJA_VERSION)

.PHONY: config
config: ## make docker-compose.yml from custom.mk config
		docker run --rm -v $(GITROOT)/templates:/templates -e WITH_EFK=$(WITH_EFK) jinja:$(JINJA_VERSION) templates/docker-compose.yml.j2 --format=yaml > $(GITROOT)/docker/docker-compose.yml

.PHONY: build
build: pull-base  ## Build
ifeq ($(CI), true)
	$(info ******************** make build  ********************)
	@cat $(ENV_FILE) > $(GITROOT)/.env
	@docker run -t \
		-e ENV=$(ENV)\
		-e USER_ID=$(USER_ID) \
		-e GROUP_ID=$(GROUP_ID) \
		-e AIRTABLE_KEY=$(AIRTABLE_KEY) \
		-u "$(CURRENT_UID)" \
		--name fe_build_$(CI_JOB_ID) \
		--rm \
		-v $(GITROOT):/root \
		$(DOCKER_CI)/$(IMAGE_NAME):dev \
		sh -c 'npm config set cache /root && yarn install --network-timeout 1000000 && if [ "$$ENV" = "production" ]; then yarn build; else yarn build:dev; fi;'
else
	$(info ******************** Build Dist ********************)
  ifeq ($(ENV), production)
		yarn build
  else
		yarn build:dev
  endif
endif

.PHONY: install
install:  ## Install node_modules
	$(info ******************** Install node_modules ********************)
	@yarn install --network-timeout 1000000

.PHONY: test
test:  ## Start unit test (CI=true for docker mode)
ifeq ($(CI), true)
	$(info ******************** Start unit test with docker ********************)
	@docker run -t \
		-e USER_ID=$(USER_ID) \
		-e GROUP_ID=$(GROUP_ID) \
		-e AIRTABLE_KEY=$(AIRTABLE_KEY) \
		-u "$(CURRENT_UID)" \
		--name fe_test_$(CI_JOB_ID) \
		--rm \
		-v $(GITROOT):/root \
		$(DOCKER_CI)/$(IMAGE_NAME):dev \
		sh -c "npm config set cache /root && yarn install --network-timeout 1000000 && make test"
else
	$(info ******************** Start unit test ********************)
	@yarn test --coverage -u
endif

.PHONY: lint
lint:  ## Start lint check (CI=true for docker mode)
ifeq ($(CI), true)
	$(info ******************** Start lint check with docker ********************)
	@docker run -t \
		-e USER_ID=$(USER_ID) \
		-e GROUP_ID=$(GROUP_ID) \
		-e AIRTABLE_KEY=$(AIRTABLE_KEY) \
		-u "$(CURRENT_UID)" \
		--name fe_lint_$(CI_JOB_ID) \
		--rm \
		-v $(GITROOT):/root \
		$(DOCKER_CI)/$(IMAGE_NAME):dev \
		sh -c "npm config set cache /root && yarn install --network-timeout 1000000 && make lint"
else
	$(info ******************** Start lint check ********************)
	yarn run lint
endif

.PHONY: stop-dev
stop-dev: config ## stop develop deployment
	@GITROOT=$(GITROOT) \
		DEV_PORT=$(DEV_PORT) \
		SERVICE_NAME=$(SERVICE_NAME) \
		NETWORK_NAME=$(NETWORK_NAME) \
		docker-compose -f docker/docker-compose.yml down

.PHONY: stop
stop: stop-dev ## stop production deployment

.PHONY: deploy
deploy: config
	@GITROOT=$(GITROOT) \
		DEV_PORT=$(DEV_PORT) \
		SERVICE_NAME=$(SERVICE_NAME) \
		NETWORK_NAME=$(NETWORK_NAME) \
		HOSTNAME=$(HOSTNAME) \
		docker-compose -f docker/docker-compose.yml up -d

