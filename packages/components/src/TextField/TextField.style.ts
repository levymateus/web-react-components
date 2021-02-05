import styled from '@emotion/styled'
import { BaseProps } from './TextField.types'

export const status = {
	default: 'blue',
	success: 'green',
	error: 'red',
	warning: '#f8c954',
	info: 'lightblue'
}

export const Container = styled.div`
    background-color: transparent;
    padding: 0;
    display: flex;
    flex-direction: column;
    position: relative;
	margin-top: 8px;
    margin-right: 8px;
    margin-bottom: 24px;
    margin-left: 8px;
`
export const Input = styled.input<BaseProps>`
    z-index: 1;
    border: 1px solid ${props => props.status !== 'default' ? status[props.status] : '#111'};
    padding-top: 8px;
    padding-right: 16px;
    padding-bottom: 8px;
    padding-left: 16px;
    color: ${props => {
		if (props.status !== 'default' || props.focused) {
			return status[props.status]
		}
		return '#111'
	}};
    border-radius: 3px;
    outline: none;
    box-sizing: border-box;
    &:focus {
        box-sizing: border-box;
        border-radius: 3px;
        border: 1px solid ${props => status[props.status]};
    }
`

export const Label = styled.label<BaseProps>`
    color: ${props => {
		if (props.status !== 'default' || props.focused) {
			return status[props.status]
		}
		return '#111'
	}};
    height: 16px;
    background-color: white;
    position: absolute;
    padding-left: 4px;
    top: 8px;
    left: 12px;
    padding-right: 4px;
    font-size: 13px;
    font-weight: bold;
    text-overflow: ellipsis;
    max-width: 224px;
    overflow: hidden;
	transition: all 0.099s ease;
	z-index: ${props => props.active ? 3 : 2};
	transform: ${props => props.active ? 'translateY(-16px)' : ''};
    &:hover {
        cursor: pointer;
    }
`

export const Counter = styled.div<BaseProps>`
    z-index: 3;
    position: relative;
    background-color: white;
	display: flex;
    justify-content: flex-end;
    padding: 0px 16px;
    font-size: 12px;
    font-weight: 500;
	color: ${props => {
		if (props.status !== 'default' || props.focused) {
			return status[props.status]
		}
		return '#111'
	}};
	& span {
		position: absolute;
		top: -8px;
		background-color: white;
		padding-left: 4px;
		padding-right: 4px;
	}
`

export const HelperText = styled.div<BaseProps>`
	z-index: 2;
	bottom: -35px;
	left: 8px;
	background-color: white;
	padding-left: 8px;
	padding-right: 8px;
	font-size: 11px;
	font-weight: 500;
	color: ${props => {
		if (props.status !== 'default') {
			return status[props.status]
		}
		return '#111'
	}};
	padding-top: 4px;
`

export const Icon = styled.div <BaseProps>`
	z-index: 2;
    position: absolute;
    color: ${props => props.status !== 'default' ? status[props.status] : '#111'};
    right: 6px;
    top: 6px;
	padding: 2px;
	background-color: white;
`
