import React, { useCallback, useRef} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi'
import { Form } from '@unform/web'
import {FormHandles } from '@unform/core'
import * as Yup from 'yup'

import api from '../../services/api';

import logo from '../../assets/logo.svg'
import Input from '../../components/Input'
import Button from '../../components/Button'

import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../context/ToastContext';

import { Container, Content, Background, AnimationContent } from './styles'

interface DataForm {
	name: string;
	email: string;
	password: string;
}

const SignUp:React.FC = () => {
	const formRef = useRef<FormHandles>(null);

	const { addToast } = useToast();
	const history = useHistory();

	const handleSubmit = useCallback( async (data: DataForm) => {
		try {
			formRef.current?.setErrors({})
			const schema = Yup.object().shape({
				name: Yup.string().required('Nome obrigatório.'),
				email: Yup.string().required('E-mail obrigatório.').email('Digite um e-mail válido.') ,
				password: Yup.string().min(6, 'Mínimo 6 digitos.'),
			})

			await schema.validate(data, {
				abortEarly: false
			});

			await api.post('users', data);

			addToast({
				type: 'success',
				title: 'Cadastro realizado.',
				description: 'Você já pode fazer seu logon no Gobarber!'
			});

			history.push('/');

		} catch (error) {
			if(error instanceof Yup.ValidationError){
				const errors = getValidationErrors(error)
				formRef.current?.setErrors(errors)
				return
			}
			addToast({
				type: 'error',
				title: 'Erro no cadastro.',
				description: 'Ocorreu um erro ao tentar cadastrar. Tente novamente.'
			});
		}
	}, [addToast, history]);


	return (
		<Container>
			<Background />
			<Content>
				<AnimationContent>
					<img src={logo} alt="GoBarber"/>

					<Form ref={formRef} onSubmit={handleSubmit} >
						<h1>Faça seu Cadastro</h1>
						<Input name="name" icon={FiUser} placeholder="Nome" />
						<Input name="email" icon={FiMail} placeholder="E-mail" />
						<Input name="password" icon={FiLock} type="password" placeholder="Senha" />
						<Button type="submit" >Cadastrar</Button>
					</Form>

					<Link to="/">
						<FiArrowLeft size={20} />
						Voltar para logon
					</Link>
				</AnimationContent>
			</Content>
		</Container>
	)
}

export default SignUp;