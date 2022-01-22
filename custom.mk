PRODUCT           := 8nd
SERVICE_NAME      := jethro-fe
NETWORK_NAME      := jethro
IMAGE_NAME        := $(PRODUCT)-$(SERVICE_NAME)
AIRTABLE_KEY      := key6GROo24nOw13pZ
FE_BUILD_VERSION  ?= $(shell sed '3!d' $(GITROOT)/package.json | grep -oE '[0-9].*[^",]')
ifeq ($(CI), true)
  WITH_EFK           := true
  ifeq ($(ENV), develop)
    HOSTNAME         := jethro-dev.mobagel.com
  else ifeq ($(ENV), demo)
    HOSTNAME         := jethro-demo.mobagel.com
  else
    HOSTNAME         := jethro.mobagel.com
  endif
else
  WITH_EFK           := false
  HOSTNAME           := jethro.localhost.com
endif

