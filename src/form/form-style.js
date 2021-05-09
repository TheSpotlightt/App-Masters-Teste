import styled from 'styled-components';

export const Container = styled.div `
    display: block;
    text-align: center;
`;

export const InputContainer = styled.div `
    display: flex;
    align-items: center;
`;

export const Form = styled.form `
    display: inline-block;
    width: 60rem;
    padding: 5rem;

    margin-top: 2rem;
    margin-bottom: 5rem;

    border: .1rem solid black;
    border-radius: 1rem;
`;

export const Label = styled.label `
    font-size: 1.5rem;
    display: inline-block;
    width: 10rem;
    text-align: center;
    
`;

export const Input = styled.input `
    -webkit-appearance: none;
    appearance: none;

    width: 45rem;
    padding: 1.8rem;
    margin-top: 2rem;
    margin-left: 2rem;

    border: .1rem solid #e0e0e0;
    background-color: #FAFAFA;
    outline: none;
    border-radius: 1rem;

    &:focus {
        border: .1rem solid black;
    }
`;

export const SubmitButton = styled.button `
    padding: 1.5rem;
    margin: 5rem auto auto auto;
    width: 35rem;

    align-items: center;
    border-radius: 1rem;
    border: none;

    background-color: #6236FF;
    color: #F0ECFF;
    cursor: pointer;

    &:hover {
        background-color: #6c58b4;
        transition: 800ms;
    }
`