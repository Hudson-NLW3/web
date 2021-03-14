import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import Orfanatos from './pages/Orfanatos';
import AddOrfanato from './pages/AddOrfanato';
import Orfanato from './pages/Orfanato';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/app" component={Orfanatos} />
                
                <Route path="/orfanato/add" component={AddOrfanato} /> 
                <Route path="/orfanato/:id" component={Orfanato} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;