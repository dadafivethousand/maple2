import '../Stylesheets/getStarted.css'
export default function GetStarted({size}){
    return(
        <div className='get-started-container'>
            <a href='#Pricing'>   <div className={`${size == 'large'? 'large' : ''} get-started-button`}>
            Get Started Now
            </div> </a> 
        </div>
    )
}