import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Tooltip } from 'antd';
import type { TooltipPlacement } from 'antd/es/tooltip';
// STYLES

const TextContainer = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const DynamicRenderTooltip: React.FC<{
  title?: string;
  placement?: TooltipPlacement;
  children: React.ReactNode;
}> = ({ title, placement, children }) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [compTooltipTitle, setCompTooltipTitle] = useState<string>('');

  useEffect(() => {
    if (textRef.current && textRef.current.offsetWidth < textRef.current.scrollWidth) {
      setCompTooltipTitle(title || textRef.current.innerText);
    } else {
      setCompTooltipTitle('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children]);

  return (
    <Tooltip
      placement={placement || 'top'}
      title={compTooltipTitle ? title || compTooltipTitle : ''}
    >
      <TextContainer ref={textRef}>{children}</TextContainer>
    </Tooltip>
  );
};
export default DynamicRenderTooltip;
