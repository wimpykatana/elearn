import React, { Component } from 'react';
import UploadContentVideo from '../../../Component/uploadContentVideo';
import UploadContentVideoPoster from '../../../Component/uploadContentVideoPoster';
import UploadDisplayImage from '../../../Component/uploadDisplayImage';

class AddCourse extends Component{

    render(){
        return(
            <div className="animated fadeIn">
                {/* VIDEO & IMAGE CONTENT EDIT */}
                <div className="row">
                        {/* <UploadContentVideo 
                            editContent={true}
                        />
                        <UploadContentVideoPoster
                            editContent={true}
                        />
                        <UploadDisplayImage
                            editContent={true}
                        /> */}
                    </div>
            </div>
        )
    }
}

export default AddCourse;