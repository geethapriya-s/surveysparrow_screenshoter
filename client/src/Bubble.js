var a={'--i':'1'};
var b={'--i':'2'};
var c={'--i':'3'};
function Bubble() {

    return (<div className="bubble"> <div className="glowing">
      <span style={a}></span>
      <span style={b}></span>
      <span style={c}></span> 
    </div>
    <div className="glowing">
    <span style={a}></span>
    <span style={b}></span>
    <span style={c}></span> 
  </div>
  <div className="glowing">
  <span style={a}></span>
  <span style={b}></span>
  <span style={c}></span> 
</div>
<div className="glowing">
      <span style={a}></span>
      <span style={b}></span>
      <span style={c}></span> 
    </div>
    <div className="glowing">
  <span style={a}></span>
  <span style={b}></span>
  <span style={c}></span> 
</div>
<div className="glowing">
      <span style={a}></span>
      <span style={b}></span>
      <span style={c}></span> 
    </div></div> )
}




export default Bubble;