import Section1 from '../components/Section1.jsx'
import Section2 from '../components/Section2.jsx'

// This is the Main page that will mount in the root (/) showing the two sections of our app

function MainPage() {
    return (
        <div className='p-2 min-h-screen flex items-center justify-center bg-gray-100'>
            <div className='h-2/4 min-w-3/4 flex flex-col justify-center custom:flex-row items-center gap-3'>
                <Section1 />
                <Section2 />
            </div>
        </div>
    )
}

export default MainPage