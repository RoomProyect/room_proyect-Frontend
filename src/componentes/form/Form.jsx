import {uploadFile} from '../../firebase/config'

const Form = ( ) =>{
return (
    <div>
    <input type="file" onChange={e => uploadFile(e.target.files[0])} />
    </div>
)

}
export default Form