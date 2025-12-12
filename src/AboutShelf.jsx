import DoodleAvatar from "./DoodleAvatar";
import "./AboutShelf.css";

function AboutShelf() {
    return (
        <div className="about-shelf">
            <div className="shelf-objects">
                {/* Picture frame with doodle */}
                <div className="frame">
                    <DoodleAvatar />
                </div>

                {/* Lamp */}
                <div className="lamp">
                    <div className="lamp-light" />
                    <div className="lamp-arm-back" />
                    <div className="lamp-stand" />
                    <div className="lamp-arm-front" />
                    <div className="lamp-head" />
                    <div className="lamp-base" />
                </div>
            </div>

            {/* Wooden shelf */}
            <div className="shelf-base" />
        </div>
    );
}

export default AboutShelf;
