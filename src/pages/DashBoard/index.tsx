import React from 'react'
import { FiChevronRight } from 'react-icons/fi';

//CSS - Styled Components
import {Title, Form, Repos} from './styles'
import logo from '../../assets/logo.svg'

type Props = {}

const DashBoard: React.FunctionComponent = (props: Props) => {
  return (
    <>
      <img src={logo} alt='GitCollection' />
      <Title>Catálogo de repositórios do Github</Title>

      <Form>
        <input placeholder='Username/Repository_name' />
        <button type='submit'>Buscar</button>
      </Form>

      <Repos>
        <a href='/respositories'>
          <img src={logo} alt="Repositorio" />
          <div>
            <strong>Rafaelholder/curso</strong>
            <p>Repositorio do mini curso</p>
          </div>
          <FiChevronRight size={20} />
        </a>
      </Repos>
    </>
  )
}
export default DashBoard;