import { css } from 'emotion'
import styled from '@emotion/styled'

export const Button = styled.button`
  border: none;
  padding: 0;
  background-color: transparent;
  font-size: 1em;
  color: rgb(77, 77, 77);
  outline: none;
  width: 32px;
  height: 32px;
  border-radius: 2px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const styles = css`
  width: 256px;
  margin: 0;
  padding: 0;
  font-weight: 400;
  font-family: "Roboto", sans-serif;
  user-select: none;
  background-color: #fff;
  padding: 8px 16px;
  border-radius: 2px;
  .flex-row-container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
  .flex-row-container > .flex-row-item {
    flex: 1 1 14%;
    justify-items: center;
  }
  .flex-row-full {
    display: flex;
    max-width: 100%;
    justify-content: space-between;
  }
  .flex-row-full > .flex-row-item {
    display: flex;
    align-items: center;
  }
  #calendar-nav #calendar-nav-title {
    padding-left: 8px;
  }
  .button {
    border: none;
    padding: 0;
    background-color: transparent;
    font-size: 1em;
    color: rgb(77, 77, 77);
    outline: none;
  }
  .item {
    width: 32px;
    height: 32px;
    border-radius: 2px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .button:active {
    background-color: rgb(200, 200, 200);
    border: none !important;
    cursor: pointer;
    outline: none !important;
  }
  .focusable:focus {
    border: 1px solid rgb(36, 36, 36);
  }
  .active {
    background-color: rgb(200, 200, 200);
    border: none;
    cursor: pointer;
    outline: none;
  }
  .selectable {
    cursor: pointer;
  }
  .selectable:hover {
    background-color: rgb(226, 226, 226);
  }
  #calendar-header {
    font-weight: 400;
    font-size: 16px;
    pointer-events: none;
  }
  #calendar-title {
    cursor: pointer;
  }
  #calendar-nav {
    font-weight: bold;
    font-size: 16px;
  }
  #calendar-dates {
    font-weight: 300;
    font-size: 14px;
  }
  .fade-in {
    animation-name: fadeIn;
    animation-duration: 0.3s;
  }
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    20% {
      opacity: 0;
    }
    40% {
      opacity: 0.3;
    }
    60% {
      opacity: 0.5;
    }
    80% {
      opacity: 0.9;
    }
    100% {
      opacity: 1;
    }
  }
`
