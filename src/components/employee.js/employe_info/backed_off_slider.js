import React from 'react'

function backed_off_slider(props) {
    
    let state = props.state
    console.log(typeof(state))
    return (
        <div>
            
            <label
              htmlFor="backedOff_toggle"
              className="input_label_style_on_disabled pt-3 mr-4"
            >
            Backedoff :
            </label>
            <label class="switch">
          {state==="true" &&<input type="checkbox" 
          defaultChecked={true}
          onClick={props.trigerToggle}
          />}
          {state !=="true" &&<input type="checkbox" 
          defaultChecked={false}
          onClick={props.trigerToggle}
          />}
          <span class="slider round"></span>
        </label>
          </div>
        
    )
}

export default backed_off_slider
