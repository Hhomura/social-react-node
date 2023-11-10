import { Link } from 'react-router-dom';
import './styles/sidebaritem.css'
import '../Animations/animations.css'
import { BsPerson } from 'react-icons/bs';

interface PersonProps {
    title: string;
    link: any
}

interface Props {
    data: PersonProps[]
    active: String
}

export default ({ data, active }: Props) => {
    return (
        <div className= {'sidebar_item_container ' + active}>
            {data.map((item) => (
                <div className='sidebar_item_container_content'>
                    <BsPerson />
                    <Link to={item.link}>
                        <span>{item.title}</span>
                    </Link>
                </div>
            ))}
        </div>
    );
}