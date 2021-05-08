import { BrowserRouter } from 'react-router-dom'
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import MainRouter from './MainRouter';
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <AppHeader />
        <MainRouter/>
        <AppFooter />
      </BrowserRouter>
    </div>
  )
}

export default App;