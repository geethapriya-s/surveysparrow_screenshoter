
import './App.css';
import $ from 'jquery';
import Form from './Form.js';
import Bubble from './Bubble';



function App() {

  return (
   <div className="aligns2">
    
      <div className="title">
 <h1>SCREENSHOTER</h1>
</div>
<Bubble/>
{/* <div class="wrapper">
  <div class="search_box">
      <input type="text" placeholder="what are you looking for?"></input>
      <i class="fas fa-search"></i>
      
  </div>   
</div>*/}

  <Form/>

    
    



</div>
  );
}

export default App;
