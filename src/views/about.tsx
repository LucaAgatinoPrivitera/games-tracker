import '../App.css';

interface AboutProps {
    className?: string; // Prop per le classi CSS opzionali
}

const About: React.FC<AboutProps> = ({ className }) => {
    return (
        // Qui funziona solo col backtick `, prima dava errore per il '
        <div className={`w-full background ${className}`}>
            <div className='lg:container mx-auto'>
                <h1 className='text-for-background'>ciao</h1>
            </div>
        </div>

    );
}

export default About;
