import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { TaskList } from '../../components/TaskList';

describe('App Page', () => {
  it('should be able to add a task', async () => {
   // renderizar o componente TaskList
   render(<TaskList />);

   // pegando o input pelo placeholder
   const taskInput = screen.getByPlaceholderText('Adicionar novo todo')

   // pegando o botão de adicionar a task
   const addTaskButton = screen.getByTestId('add-task-button')

   // Mudando o valor do task input
   fireEvent.change(taskInput, {
     target: {
       value: 'Desafio ReactJS Ignite'
     }
   })

   // Clicando no botão de submit do form
   fireEvent.click(addTaskButton)

   // Pegando a primeira task adicionada
   const firstTask = screen.getByText('Desafio ReactJS Ignite')

   // Esperando que no valor dela tenha o valor 'Desafio ReactJS Ignite'.
   expect(firstTask).toHaveTextContent('Desafio ReactJS Ignite')
   // Esperando que o desafio não esteja com a classe completed.
   expect(firstTask.parentElement).not.toHaveClass('completed')

  })

  it('should not be able to add a task with a empty title', () => {
    // Renderizar o componente
    render(<TaskList />)

    // Pegar o botão de adicionar uma task
    const addTaskButton = screen.getByTestId('add-task-button')

    // Dar submit no form
    fireEvent.click(addTaskButton)

    // Esperando que não tenha nenhuma task.
    expect(screen.queryByTestId('task')).not.toBeInTheDocument();

  })

  it('should be able to remove a task', async () => {
    // Renderizando o componente na tela
    render(<TaskList />)

    // Pegando o input pelo placeholder
    const inputTask = screen.getByPlaceholderText('Adicionar novo todo')

    // Pegando o botão de adicionar uma task
    const buttonAddTask = screen.getByTestId('add-task-button')

    // mudando o valor do input
    fireEvent.change(inputTask, {
      target: {
        value: 'Beber Água'
      }
    })

    // Dando submit no formulário
    fireEvent.click(buttonAddTask)

    // Esperando que a Task Beber Água exista na tela
    expect(screen.getByText('Beber Água')).toBeInTheDocument()

    // Pegando o botão de excluir task
    const removeTaskButton = screen.getByTestId('remove-task-button')
    
    // Removendo a task
    fireEvent.click(removeTaskButton)

    // Esperando que a Task Beber Água não exista na tela
    expect(screen.queryByText('Beber Água')).not.toBeInTheDocument()
  })

  it('should be able to check a task', () => {
    // Renderizando o componente TaskList
    render(<TaskList />)

    // Pegar o input com o texto do placeholder
    const inputTask = screen.getByPlaceholderText('Adicionar novo todo')

    // Pegar o botão pelo data-test-id
    const buttonAddTask = screen.getByTestId('add-task-button')

    // Mudar o valor do input para Beber Água
    fireEvent.change(inputTask, {
      target: {
        value: 'Beber Água'
      }
    })

    // Clicando no botão de adicionar uma task
    fireEvent.click(buttonAddTask)

    fireEvent.change(inputTask, {
      target: {
        value: 'Desafio ReactJS Ignite'
      }
    });

    // Clicando no botão de adicionar uma task
    fireEvent.click(buttonAddTask)

    const [firstTask, secondTask] = screen.getAllByTestId('task');

    if (firstTask.firstChild) {
      fireEvent.click(firstTask.firstChild)
    }

    expect(firstTask).toBeInTheDocument();
    expect(firstTask).toHaveClass('completed');

    expect(secondTask).toBeInTheDocument();
    expect(secondTask).not.toHaveClass('completed');

  })
})
