import './Stylesheets/Belt.css';

const BlackBelt = () => (
    <div className='Belt'>
        {[...Array(7)].map((_, i) => <div key={i} className='black'></div>)}
        {[...Array(2)].map((_, i) => <div key={i + 5} className='red'></div>)}
        {[...Array(2)].map((_, i) => <div key={i + 7} className='black'></div>)}
    </div>
);

const BrownBelt = () => (
    <div className='Belt'>
        {[...Array(7)].map((_, i) => <div key={i} className='brown'></div>)}
        {[...Array(2)].map((_, i) => <div key={i + 5} className='black'></div>)}
        {[...Array(2)].map((_, i) => <div key={i + 7} className='brown'></div>)}
    </div>
);

const PurpleBelt = () => (
    <div className='Belt'>
        {[...Array(7)].map((_, i) => <div key={i} className='purple'></div>)}
        {[...Array(2)].map((_, i) => <div key={i + 5} className='black'></div>)}
        {[...Array(2)].map((_, i) => <div key={i + 7} className='purple'></div>)}
    </div>
);

const BlueBelt = () => (
    <div className='Belt'>
        {[...Array(7)].map((_, i) => <div key={i} className='blue'></div>)}
        {[...Array(2)].map((_, i) => <div key={i + 5} className='black'></div>)}
        {[...Array(2)].map((_, i) => <div key={i + 7} className='blue'></div>)}
    </div>
);

export default function Belt({ belt }) {
    let beltComponent;

    switch (belt) {
        case 'Black Belt':
            beltComponent = <BlackBelt />;
            break;
        case 'Brown Belt':
            beltComponent = <BrownBelt />;
            break;
        case 'Purple Belt':
            beltComponent = <PurpleBelt />;
            break;
        case 'Blue Belt':
            beltComponent = <BlueBelt />;
            break;
        default:
            beltComponent = <div>Invalid belt color</div>;
    }

    return (
        <div className="BeltContainer">
            {beltComponent}
        </div>
    );
}
