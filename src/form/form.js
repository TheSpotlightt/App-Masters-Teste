import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import axios from 'axios';

import Spinner from '../spinner/spinner'


import {
    Container, 
    Form, 
    Input, 
    SubmitButton,
    Label,
    InputContainer
} from './form-style';

const normalizeCEP = (value) => {
    const match = value.replace(/[0-9]{5}-[\d]{3}/g)
    if (match.length <= 5) {
        return console.log(`${match.slice(0, 5)}-${match.slice(5)}`)
    } else {
        return console.log(`${match.slice(0, 5)}-${match.slice(5, 8)}`)
    }
};

const confirmError = () => {
    confirmAlert({
        title: 'Ops! Algo deu errado.',
        message: 'Algo de errado ocorreu ao fazer a inscrição, tente novamente mais tarde.',
        buttons: [
            {
                label: 'OK!'
            }
        ],
        overlayClassName: "overlay-custom-class-name"
    });
};

const confirm = () => {
    confirmAlert({
        title: 'Muito bom!',
        message: 'Você receberá seus adesivos em alguns dias',
        buttons: [
            {
                label: 'OK!'
            }
        ],
        overlayClassName: "overlay-custom-class-name"
    });
};


export default function RegisterForm () {
    const { register, handleSubmit } = useForm();
    const [isLoading, setLoading] = useState(false);
    const [cep, getCep] = useState('');
    const [readOnlyState, setReadOnlyState] = useState(true);

    const [neighborhoodValue, getNeighborhoodValue] = useState('');
    const [cityValue, getCityValue] = useState('');
    const [stateValue, getStateValue] = useState('');


    if (cep.length === 8) {
        axios.get(`https://brasilapi.com.br/api/cep/v1/${cep}`)
        .then(res => {
            getNeighborhoodValue(res.data.neighborhood);
            getCityValue(res.data.city);
            getStateValue(res.data.state)
            setReadOnlyState(true)
        }).catch (error => {
            if (error) {
                alert('CEP não encontrado!')
                setReadOnlyState(false)
            }
        })
    }

    const onSubmit = async (data) => {
        console.log(data.name)
        if (data) {
            setLoading(true)
        }
        await axios.post('https://simple-api-selection.herokuapp.com/submit/', {
            name: data.name,
            email: data.email,
            phone: data.phone,
            addressZip: data.addressZip,
            addressStreet: data.addressStreet,
            addressNumber: data.addressNumber,
            addressComplement: data.addressComplement,
            addressDistrict: data.addressDistrict,
            addressCity: data.addressCity,
            addressState: data.addressState,
        })
        .catch(error => {
            if (error) {
                confirmError();
            } else {
                confirm();
            }
        })
        .finally(() => {
            setLoading(false)
        })
    }

    return isLoading ? <Spinner /> : (
        <Container>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <InputContainer>
                    <Label> Nome: </Label>
                    <Input 
                        type="text" 
                        placeholder="Nome" 
                        name="name" 
                        autoComplete="true" 
                        {
                            ...register('name')
                        }
                    />
                </InputContainer>

                <InputContainer>
                    <Label> Email: </Label>
                    <Input
                        type="email"
                        placeholder="Email"
                        name="email"
                        autoComplete="true"
                        {
                            ...register('email')
                        }
                    />
                </InputContainer>

                <InputContainer>
                    <Label> Telefone: </Label>
                    <Input 
                        type="tel"
                        placeholder="Telefone"
                        name="phone"
                        
                        {...register('phone')}
                    />
                </InputContainer>

                <InputContainer>
                    <Label> CEP: </Label>
                    <Input 
                        type="tel"
                        placeholder="CEP"
                        name="addressZip"
                        {
                            ...register('addressZip')
                        }
                        onChange={event => {
                            normalizeCEP(event.target.value)
                            getCep(event.target.value)
                        }}
                    />
                </InputContainer>

                <InputContainer>
                    <Label> Logradouro: </Label>
                    <Input 
                        type="text"
                        placeholder="Logradouro"
                        name="addressStreet"
                        autoComplete="true"
                        {
                            ...register('addressStreet')
                        }
                    />
                </InputContainer>

                <InputContainer>
                    <Label> Número: </Label>
                    <Input 
                        type="tel"
                        placeholder="Número"
                        name="addressNumber"
                        {
                            ...register('addressNumber')
                        }
                    />
                </InputContainer>

                <InputContainer>
                    <Label> Complemento: </Label>
                    <Input 
                        type="text"
                        placeholder="Complemento"
                        name="addressComplement"
                        autoComplete="true"
                        {
                            ...register('addressComplement')
                        }
                    />
                </InputContainer>

                <InputContainer>
                    <Label> Bairro: </Label>
                    <Input
                        readOnly={readOnlyState}
                        type="text"
                        placeholder="Bairro"
                        defaultValue={neighborhoodValue}
                        name="addressDistrict"
                        
                        autoComplete="true"
                        {
                            ...register('addressDistrict')
                        }
                    />
                </InputContainer>

                <InputContainer>
                    <Label> Cidade: </Label>
                    <Input 
                        readOnly={readOnlyState}
                        type="text"
                        defaultValue={cityValue}
                        placeholder="Cidade"
                        name="addressCity"
                        autoComplete="true"
                        {
                            ...register('addressCity')
                        }
                    />
                </InputContainer>

                <InputContainer>
                    <Label> Estado: </Label>
                    <Input 
                        readOnly={readOnlyState}
                        type="text"
                        defaultValue={stateValue}
                        placeholder="Estado"
                        name="addressState"
                        autoComplete="true"
                        {
                            ...register('addressState')
                        }
                    />
                </InputContainer>
                <SubmitButton type="submit">Submit</SubmitButton>
            </Form>
        </Container>
    )
}