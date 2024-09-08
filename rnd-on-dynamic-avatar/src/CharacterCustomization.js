import React, { useState } from "react";
import './CharacterCustomization.css';
import { IoWoman } from "react-icons/io5";
import { IoMan } from "react-icons/io5";


// The JSON data for images
const characterData = {

    "gender": {
        "male": {
            "hair": {
                "style1": {
                    "light": "/images/hair/male/model-1/light-model-1.png",
                    "brown": "/images/hair/male/model-1/Brown-model-1.png",
                    "black": "/images/hair/male/model-1/Black-model-1.png",
                    "red": "/images/hair/male/model-1/Red-model-1.png",
                    "yellow": "/images/hair/male/model-1/Yellow-model-1.png"
                },
                "style2": {
                    "light": "/images/hair/male/model-2/light-model-2.png",
                    "brown": "/images/hair/male/model-2/Brown-model-2.png",
                    "black": "/images/hair/male/model-2/Black-model-2.png",
                    "red": "/images/hair/male/model-2/Red-model-2.png",
                    "yellow": "/images/hair/male/model-2/Yellow-model-2.png"
                },
                "style3": {
                    "light": "/images/hair/male/model-3/light-model-3.png",
                    "brown": "/images/hair/male/model-3/Brown-model-3.png",
                    "black": "/images/hair/male/model-3/Black-model-3.png",
                    "red": "/images/hair/male/model-3/Red-model-3.png",
                    "yellow": "/images/hair/male/model-3/Yellow-model-3.png"
                }
            },
            "skinTone": {
                "light": "/images/skin/male-skin/white-skin.png",
                "medium": "/images/skin/male-skin/Medium-skin.png",
                "lightMedium": "/images/skin/male-skin/Light-Medium-skin.png",
                "dark": "/images/skin/male-skin/Dark-skin.png"
            }
        },
        "female": {
            "hair": {
                "style1": {
                    "light": "/images/hair/female/model-1/light-model-1.png",
                    "brown": "/images/hair/female/model-1/Brown-model-1.png",
                    "black": "/images/hair/female/model-1/Black-model-1.png",
                    "red": "/images/hair/female/model-1/Red-model-1.png",
                    "yellow": "/images/hair/female/model-1/Yellow-model-1.png"
                },
                "style2": {
                    "light": "/images/hair/female/model-2/light-model-2.png",
                    "brown": "/images/hair/female/model-2/Brown-model-2.png",
                    "black": "/images/hair/female/model-2/Black-model-2.png",
                    "red": "/images/hair/female/model-2/Red-model-2.png",
                    "yellow": "/images/hair/female/model-2/Yellow-model-2.png"
                },
                "style3": {
                    "light": "/images/hair/female/model-3/light-model-3.png",
                    "brown": "/images/hair/female/model-3/Brown-model-3.png",
                    "black": "/images/hair/female/model-3/Black-model-3.png",
                    "red": "/images/hair/female/model-3/Red-model-3.png",
                    "yellow": "/images/hair/female/model-3/Yellow-model-3.png"
                }
            },
            "skinTone": {
                "light": "/images/skin/female-skin/Light-skin.png",
                "medium": "/images/skin/female-skin/Medium-skin.png",
                "lightMedium": "/images/skin/female-skin/Light-Medium-skin.png",
                "dark": "/images/skin/female-skin/Dark-skin.png"
            }
        }
    },
    "eyeColor": {
        "green": "/images/eye/Green-eye.png",
        "blue": "/images/eye/blue-eye.png",
        "brown": "/images/eye/Brown-eye.png"
    }
};

const CharacterCustomization = () => {



    const [character, setCharacter] = useState({
        name: "",
        gender: "female",
        hairColor: "light",
        hairStyle: "style1",
        eyeColor: "green",
        skinTone: "light",
    });

    const updateCharacter = (key, value) => {
        setCharacter({ ...character, [key]: value });
    };

    const getCharacterImage = () => {
        const { gender, hairStyle, hairColor, skinTone, eyeColor } = character;

        // Get hair image based on gender, style, and color
        const hairImage = characterData.gender[gender].hair[hairStyle][hairColor];

        // Get skin tone image based on gender and tone
        const skinImage = characterData.gender[gender].skinTone[skinTone];

        // Get eye color image
        const eyeImage = characterData.eyeColor[eyeColor];

        return { hairImage, skinImage, eyeImage };
    };

    const { hairImage, skinImage, eyeImage } = getCharacterImage();




    const handleGenerateImage = async () => {
        try {
            const { hairImage, skinImage, eyeImage } = getCharacterImage();
            const response = await axios.post('/api/customize-image', {
                baseImageUrl: 'https://www.dinkleboo.com/media/catalog/product/cache/1/image/500x500/9df78eab33525d08d6e5fb8d27136e95/l/i/lifestyle_-_the_firefighter_1.jpg',
                customizations: {
                    hairImage,
                    skinImage,
                    eyeImage,
                    ...character
                }
            });
            setCustomizedImage(response.data.imageUrl);
        } catch (error) {
            console.error(error);
        }
    };




    return (
        <div className="customization-container">

            <div className="block lg:flex gap-16 items-center  ">
                <div className="character-preview flex-1  h-[480px]">

                    {/* Character Preview */}
                    <div className={`shadow ${character.gender === 'female' ? 'shadow-pink-500' : 'shadow-blue-600'} rounded w-full flex px-28 gap-12 pt-11 pb-8`}>

                        <div className="  flex-1">



                            <div className="form-group w-full ">
                                <label htmlFor="name" className="label text-gray-500">Name<span className="text-red-500">*</span>  </label>
                                <input
                                    type="text"
                                    id="name"
                                    maxLength="14"
                                    className={`w-full shadow px-5 py-1 outline-none  rounded ${character.gender === 'female' ? 'shadow-pink-500 text-pink-500' : 'shadow-blue-600 text-blue-600'} `}
                                    value={character.name}
                                    onChange={(e) => updateCharacter("name", e.target.value)}
                                    placeholder="Enter name"
                                />
                                <p className="char-limit font-thin mt-1 text-black">Maximum number of characters: 14</p>
                            </div>
                            <div className="form-group ">
                                <label htmlFor="dadication_page" className="label text-gray-500">Dedication Page <span className="text-red-500">*</span>  </label>
                                <textarea
                                    placeholder="Dear 

                                        This special book was made just for you! You are the main character, so enjoy the magic as you read.

                                        Lots of Love"
                                    rows={8}
                                    className={`w-full shadow px-5 py-1 outline-none  rounded ${character.gender === 'female' ? 'shadow-pink-500 text-pink-500' : 'shadow-blue-600 text-blue-600'} `}
                                />
                                <p className="char-limit font-thin mt-1 text-black">Maximum number of characters: 320</p>
                            </div>




                        </div>
                        <div className="character-image relative">
                            <img src={hairImage} alt="Hair" className="hair-image absolute top-0 left-0 z-10" />
                            <img src={skinImage} alt="Skin" className="skin-image absolute top-0 left-0" />
                            <img
                                src={eyeImage}
                                alt="Eye"
                                className={`eye-image absolute ${character.gender === 'female' ? '-top-[6px] left-[13px]' : ''
                                    }`}
                            />
                        </div>

                    </div>
                </div>

                <div className="customization-options">
                    <div className="option-group">
                        <label className="label">Gender*</label>
                        <div className="options">
                            <button
                                className={`option ${character.gender === "male" ? "selected" : ""}`}
                                onClick={() => updateCharacter("gender", "male")}
                            >
                                <IoMan color="blue" size={32} />

                            </button>
                            <button
                                className={`option ${character.gender === "female" ? "selected" : ""}`}
                                onClick={() => updateCharacter("gender", "female")}
                            >
                                <IoWoman color="#ff52b7" size={32} />

                            </button>
                        </div>
                    </div>

                    <div className="option-group">
                        <label className="label">Hair Color*</label>
                        <div className="options">
                            {["light", "brown", "red", "black", "yellow"].map((color) => (
                                <button
                                    key={color}
                                    className={`option ${character.hairColor === color ? "selected" : ""}`}
                                    onClick={() => updateCharacter("hairColor", color)}
                                >
                                    <div className={`hair-color ${color}`}></div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="option-group">
                        <label className="label">Hair Style*</label>
                        <div className="options">
                            {["style1", "style2", "style3"].map((style, index) => (
                                <button
                                    key={style}
                                    className={`option ${character.hairStyle === style ? "selected" : "border"}`}
                                    onClick={() => updateCharacter("hairStyle", style)}
                                >

                                    <img src={require(`./hairModel/${character.gender === 'female' ? 'Girl' : 'Boy'}_Hair_${index + 1}.png`)} width={32} alt="My Image" />

                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="option-group">
                        <label className="label">Eye Color*</label>
                        <div className="options">
                            {["green", "brown", "blue"].map((color) => (
                                <button
                                    key={color}
                                    className={`option ${character.eyeColor === color ? "selected" : ""}`}
                                    onClick={() => updateCharacter("eyeColor", color)}
                                >
                                    <div className={`eye-color ${color}`}></div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="option-group">
                        <label className="label">Skin Tone*</label>
                        <div className="options">
                            {["light", "medium", "lightMedium", "dark"].map((tone) => (
                                <button
                                    key={tone}
                                    className={`option ${character.skinTone === tone ? "selected" : ""}`}
                                    onClick={() => updateCharacter("skinTone", tone)}
                                >
                                    <div className={`skin-tone ${tone}`}></div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <button onClick={handleGenerateImage}>Generate Customized Image</button>

{customizedImage && (
    <div>
        <img src={customizedImage} alt="Customized Character" />
    </div>
)}
        </div>
    );
};

export default CharacterCustomization;
