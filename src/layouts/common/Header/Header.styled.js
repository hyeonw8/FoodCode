import styled, { css, keyframes } from 'styled-components';

const LogoImg = styled.img`
  width: 350px;
  height: auto;
  margin-right: 10px;
`;

const HeaderWrapDiv = styled.div`
  margin: 36px 65px 0px 65px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StrBtn = styled.button`
  background-color: #1b4b9c;
  color: white;
  border-radius: 30px;
  padding: 12px 20px;
  font-size: 18px;
  width: 120px;
  height: 48px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    /* background-color: white;
    color: #1b4b9c; */
    background-color: #3b6fbf;
    /* #0a2f6d */
  }
`;

const StrNavWrapDiv = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  gap: 13px;
`;

const UserImg = styled.img`
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 50%;
`;

const DropdownButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  svg {
    color: #868e96;
    &:hover {
      color: black;
    }
  }
`;

const dropdownAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 10px 0;
  margin: 0;
  list-style: none;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition:
    opacity 0.3s ease,
    transform 0.3s ease,
    visibility 0.3s;
  li:first-child {
    position: relative;
    &::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 10px;
      width: 80%;
      height: 2.5px;
      background-color: #1a4999;
    }
  }
  ${({ $isOpen }) =>
    $isOpen &&
    css`
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
      animation: ${dropdownAnimation} 0.3s ease;
    `}
`;

const DropdownMenuItem = styled.li`
  padding: 10px 20px;
  color: #1a4999;
  font-weight: bold;
  cursor: pointer;

  a {
    color: #1a4999;
    font-weight: bold;
  }

  &:hover {
    background-color: #f5f5f5;
  }
`;

export { DropdownButton, DropdownMenu, DropdownMenuItem, HeaderWrapDiv, LogoImg, StrBtn, StrNavWrapDiv, UserImg };
