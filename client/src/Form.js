import React, { Component } from 'react';
import './Form.css';
import validator from 'validator';



class Form extends Component{
    constructor(props)
    {
        super(props)
        this.state={
            url:"",
            format:"png",
            range:0,
            path:"",
            loading: false,
            error:false,
            downloadURL:"https://screenshoterserver.herokuapp.com/download/"
        }
       
    }

    handleURL=(event)=>{
        event.preventDefault();
        this.setState({
            url:event.target.value,
            error:false,
            path:""
        })
        
    }

    handleSubmit=()=>{

       var data={
           url:this.state.url,
           format:this.state.format,
           range:this.state.range,
           loading:true
       } 

       if(validator.isURL(this.state.url)){
        this.setState({
          error:false,
          loading:true
      })
       }
       else{
        this.setState({
          error:true,
          path:"",
          loading:false
      })
       }
      
      //  console.log(data);
    //   axios.post('http://127.0.0.1:3002/capture', data)
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
      
    //   this.setState({
    //     img: res.fileName,
    //     path:"",
    //     quality:80,
    //     format:"png",
    //   })
    const headers = {
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      };
          
    fetch( 'https://screenshoterserver.herokuapp.com/capture', headers)
    .then(response=>response.json())
    .then(response=>{
        console.log(response)
        if(!response.fileName)
          {
            this.setState({
              loading :  false,
              // path:""
            })
            return;
          }
      this.setState({

        path: response.fileName,
        url:"",
        range:80,
        format:"png",
        loading:false
      })
    })
     .catch(err=>console.log(err));
   
    }
    handleFormat=(event)=>{
        this.setState({
            format:event.target.value
        }) 
    }
    handleRange=(event)=>{
        this.setState({
            range:event.target.value
        }) 
    }
    

    render(){ 
       
        return(<div className="aligns1">
            <div className="aligns row">

            
                <input type='text'  className="box"  onChange={this.handleURL} value={this.state.url} placeholder="ENTER THE URL HERE!!!"/>
           
            {this.state.error === true ? <div className="error col-12">Invalid URL</div> : null}
                  <div className="format col-12"><label>png</label>
          <input type="checkbox" value="png" onChange={() => {}} checked={this.state.format === 'png'} onClick={this.handleFormat}  />
          <label>jpeg</label><input type="checkbox" value="jpeg" onChange={() => {}} checked={this.state.format === 'jpeg'} onClick={this.handleFormat} />
        </div>
               <div className="col-12"> <span id="rangeValue">{this.state.range}</span>
                <input className="range" type="range" value={this.state.range} min="0" max="1s000" onChange={this.handleRange}></input>
                </div><br></br>
                <br></br><br></br><br></br><br></br>
                      <div className="col-12"> {
          this.state.loading === true 
            ? 	 
            	<div class id="loader"  >
            <div id="shadow"></div>
            <div id="box"></div>
          </div>:
          <div>  <button  type="submit" onClick={this.handleSubmit}>Submit<span></span><span></span><span></span><span></span></button>
          </div>}</div>
            </div>
         
         <br></br><br></br><br></br><br></br><br></br>
      
               { this.state.path === '' || this.state.error === true ? null  : 
                  <div className="divImage col-12">
                    <img className="image" src={"https://screenshoterserver.herokuapp.com/"+this.state.path} alt={"."}></img><br></br><br></br>
                    <a className="button" href={this.state.downloadURL+this.state.path}>Download</a>
                    </div>
                  
        }
    
            </div>
        );   
}}
export default Form