
import { Provider } from 'react-redux'
import './App.css'
import store from './store/store'
import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './router/AppRouter'

export default function App() {
  
  return (
    <Provider store={ store }>
      <BrowserRouter>
        <AppRouter/>
      </BrowserRouter>
    </Provider>
  )
}