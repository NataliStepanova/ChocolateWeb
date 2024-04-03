import './App.css';
import Calculator from './components/Calculator/Calculator';
import ArchiveOfRecipes from './components/Archive OfRecipes/ArchiveOfRecipes';

function App() {
  return (
    <>
    <h2 className="headerCalc">Введите количество ингредиентов</h2>
    <Calculator />
    <ArchiveOfRecipes/>
    </>
  );
}

export default App;
