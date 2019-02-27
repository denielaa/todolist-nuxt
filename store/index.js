import Vuex from "vuex";

const createStore = () => {
  return new Vuex.Store({
    state: {
      todos: [],
      todo: {}
    },
    mutations: {
      SET_TODOS(state, todos) {
        state.todos = todos;
      },
      SET_TODO(state, todo) {
        state.todo = todo;
      },
      ADD_TODO(state, todo) {
        state.todos.push(todo)
      },
      UPDATE_TODO(state, data) {
        const index = state.todos.findIndex(todo => todo._id === data._id)
        state.todos[index].completed = data.completed
        state.todos[index].title = data.title
      },
      REMOVE_TODO(state, todo) {
        const index = state.todos.indexOf(todo)
        state.todos.splice(index, 1)
      }
    },
    actions: {
      async setTodos ({ commit }) {
        try {
          const { data } = await this.$axios.get('/todos')
          if (data) commit('SET_TODOS', data)
        } catch (error) {
          console.error(error)
        }
      },
      async setTodo ({ commit }, id) {
        try {
          const { data } = await this.$axios.get(`/todos/${id}`)
          if (data) commit('SET_TODO', data)
          console.log(data)
        } catch (error) {
          console.error(error)
        }
      },
      async addTodo ({ commit }, todo) {
        try {
          const { data } = await this.$axios.post('/todos', todo)
          if (data) commit('ADD_TODO', data)
        } catch (error) {
          console.error(error)
        }
      },
      async updateTodo ({ commit }, { params, todo }) {
        try {
          const { data } = await this.$axios.patch(`/todos/${todo._id}`, params )
          if (data) commit('UPDATE_TODO', data)
        } catch (error) {
          console.error(error)
        }
      },
      async removeTodo ({ commit }, todo) {
        try {
          await this.$axios.delete(`/todos/${todo._id}`)
          commit('REMOVE_TODO', todo)
        } catch (error) {
          console.error(error)
        }
      },
    },
    getters: {
      todos(state) {
        return state.todos;
      },
      todo(state) {
        return state.todo;
      }
    }
  });
};

export default createStore;
