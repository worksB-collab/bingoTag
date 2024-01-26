import './App.css';
import BingoGenerator from "./component/BingoGenerator";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import BingoAward from "./component/BingoAward";
import {StrictMode} from "react";

function App() {
    return (
        <div className="App">
            <StrictMode>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<BingoGenerator/>}/>
                        <Route path='/award' element={<BingoAward/>}/>
                    </Routes>
                </BrowserRouter>
            </StrictMode>

        </div>
    );
}

export default App;
