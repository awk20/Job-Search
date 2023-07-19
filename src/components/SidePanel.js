import { useState } from'react';

export default function SidePanel() {
    const [isOpen, setIsOpen] = useState(false)

    const toggleSidePanel = () => {
        return (
            setIsOpen(prevIsOpen => !isOpen)
        )
    }

    return (
        <div>
            <button onClick={toggleSidePanel}>Toggle Panel</button>
            {isOpen && <div>
                {<h1>Side Panel</h1>}    
                </div>
            }
        </div>
    )
}