import React, { useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'


import logo from '../../assets/logo.svg'
import Input from '../../components/Input'
import Button from '../../components/Button'
import getValidationErrors from '../../utils/getValidationErrors';

import {useAuth} from '../../context/AuthenticateContext';
import {useToast} from '../../context/ToastContext';

import { Container, Content, Background, AnimationContent } from './styles'

interface SignInFormData {
	email: string;
	password: string;
}

const SignIn:React.FC = () => {
	const formRef = useRef<FormHandles>(null);

	const { signIn } = useAuth();
	const { addToast } = useToast();

	const handleSubmit = useCallback( async (data: SignInFormData) => {
		try {
			formRef.current?.setErrors({})
			const schema = Yup.object().shape({
				email: Yup.string().required('E-mail obrigatório.').email('Digite um e-mail válido.') ,
				password: Yup.string().required('Senha obrigatória'),
			})

			await schema.validate(data, {
				abortEarly: false
			});

			await signIn({
				email: data.email,
				password: data.password,
			});

		} catch (error) {
			if(error instanceof Yup.ValidationError){
				const errors = getValidationErrors(error)
				formRef.current?.setErrors(errors)
				return
			}
			//Toast Message
			addToast({
				type: 'error',
				title: 'Erro na autenticação',
				description: 'Ocorreu um erro ao fazer login. Cheque as credenciais.'
			});
		}
	}, [signIn, addToast])

	return (
		<Container>
			<Content>
				<AnimationContent>
					<img src={logo} alt="GoBarber"/>
					<Form ref={formRef} onSubmit={handleSubmit} >
						<h1>Faça seu Logon</h1>
						<Input name="email" icon={FiMail} placeholder="E-mail" />
						<Input name="password" icon={FiLock} type="password" placeholder="Senha" />
						<Button type="submit" >Entrar</Button>
						<a href="/">
							Esqueci minha senha
						</a>
					</Form>
					<Link to="/signup">
						<FiLogIn size={20} />
						Criar conta
					</Link>
				</AnimationContent>
			</Content>
			<Background />
		</Container>
	)
}

export default SignIn;