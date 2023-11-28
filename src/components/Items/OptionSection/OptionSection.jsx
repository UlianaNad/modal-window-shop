import React, { useCallback, useEffect, useState } from 'react';
import EdgePreview from './EdgePreview/EdgePreview';

//import EdgePreview from './EdgePreview';
// import SizesBlock from './SizesBlock.jsx/SizesBlock';
// import SelectEdges from './SelectEdges/SelectEdges';

const OptionSection = ({product, close}) => {

    console.log(product);
     const{dimensions, offers} = product;

    const [customOptions, setCustomOptions] = useState({});
    const [possibleAmountOfPieces, setPossibleAmountOfPieces] = useState(null);
    const [cutItemPrice, setCutItemPrice] = useState(null);
    const [totalPrice, setTotalPrice] = useState(null);
    const [AmountOfCustomParticles, setAmountOfCustomParticles] = useState(null);
    const [edgeBlock, setEdgeBlock] = useState(false)


    useEffect(() => {
        const startSquare = dimensions.width * dimensions.height;
        const customSquare = customOptions.customHeight * customOptions.customWidth;
        setPossibleAmountOfPieces(Math.ceil(startSquare / customSquare))
    }, [customOptions, dimensions]);


    useEffect(() => {
        if (customOptions.totalAmount !== null) {
            setCutItemPrice(Math.round(offers.price / possibleAmountOfPieces))
        }
    }, [customOptions, offers, possibleAmountOfPieces]);

    useEffect(() => {
        if (customOptions.totalAmount && AmountOfCustomParticles > 0)
            setTotalPrice(Math.round(offers.price * AmountOfCustomParticles))
        setAmountOfCustomParticles(Math.ceil(customOptions.totalAmount / possibleAmountOfPieces))
    }, [offers, customOptions.totalAmount, AmountOfCustomParticles, possibleAmountOfPieces]);

    useEffect(()=>{
        window.localStorage.setItem("customOptions", JSON.stringify(customOptions))
    },[customOptions])

    const handleChangeInput = ({ target }) => {
        if (target.name === 'width') {
            if (target.value < 0 || target.value > dimensions.width) {
                alert('Check the size!');
            } else {
                setCustomOptions({
                    ...customOptions,
                    customWidth: target.value
                });
            }
        }

        if (target.name === 'height') {
            if (target.value < 0 || target.value > dimensions.height) {
                alert('Write smaller size');
            } else {
                setCustomOptions({
                    ...customOptions,
                    customHeight: target.value
                });
            }
        }

        if (target.name === 'total-amount') {
            if (target.value > 0) {
                setCustomOptions({
                    ...customOptions,
                    totalAmount: target.value,
                });

            }
        }

    };

    const handleOpenEdgeBlock = () => {
        setEdgeBlock(true)
    }
    const handleCloseEdgeBlock = () => {
        setEdgeBlock(false)
        setCustomOptions({
            ...customOptions,
            edgeWidth: null,
            edgeSides: null
        });
    }

    const handleChangeSelect = ({ target }) => {
        if (target.name === 'edge-width') {
            setCustomOptions({
                ...customOptions,
                edgeWidth: target.value
            });
        }
    }

  
    const handleEdgeSide = useCallback((data) => {
        setCustomOptions({
            ...customOptions,
            edgeSides: data
        });
    }, [customOptions]);

    const handleFormSubmit = (e) =>{
        e.preventDefault();
    
          setCustomOptions({
            ...customOptions,
            possibleAmountOfPieces:possibleAmountOfPieces,
            cutItemPrice:cutItemPrice,
            totalPrice:totalPrice,
            AmountOfCustomParticles:AmountOfCustomParticles,
            edgeBlock:edgeBlock
        });
        close()
    }

    return (
        <section className="option">
            <div className="modal-window">
                <form
                    onSubmit={handleFormSubmit}
                    action=""
                    className="item-sizes-form"
                >
                    <div className="item-sizes-block">
                        <h4>Розміри:</h4>
                        <ul>
                            <li>
                                <label className="width">
                                    Ширина
                                    <input
                                        onChange={handleChangeInput}
                                        type="number"
                                        name="width"
                                        id="width"
                                        className="width"
                                    />
                                    <span className="input-group-dimension-addon">mm</span>
                                </label>
                                <p>
                                    Max: <span>{dimensions.width} mm</span>
                                </p>
                            </li>
                            <li>
                                <label className="height">
                                    Висота
                                    <input
                                        onChange={handleChangeInput}
                                        type="number"
                                        name="height"
                                        id="height"
                                        className="height"
                                    />
                                    <span className="input-group-dimension-addon">mm</span>
                                </label>
                                <p>
                                    Max: <span>{dimensions.height} mm</span>
                                </p>
                            </li>
                        </ul>
                        <p>
                            Загальна кількість потрібних деталей:
                            <input
                                onChange={handleChangeInput}
                                type="number"
                                name="total-amount"
                            />
                            шт.
                        </p>
                        <p>
                            Кількість листів з порізки одного листа:
                            <span className="cut_piece">
                                {possibleAmountOfPieces ? possibleAmountOfPieces : 0}
                            </span>
                            шт.
                        </p>
                        <p>
                            Ціна за 1 вирізаний лист:
                            <span> {cutItemPrice ? cutItemPrice : 0} </span>грн
                        </p>

                        <p>
                            Загальна кількість листів для порізки
                            <span>
                                {AmountOfCustomParticles
                                    ? AmountOfCustomParticles
                                    : 0}
                            </span>
                            шт. i їх загальна вартість
                            <span> {totalPrice ? totalPrice : 0}</span>
                            грн
                        </p>
                    </div>
                    {/* <SizesBlock products={products} handleSizesSubmit={handleSizesSubmit} handleSubmit={handleSubmit} /> */}
                    <div className="edge-block">
                        <h4>Кромка</h4>
                        <button type="button" onClick={handleOpenEdgeBlock}>
                            Так
                        </button>
                        <button type="button" onClick={handleCloseEdgeBlock}>
                            Ні
                        </button> *
                        {edgeBlock ? (
                            <div>
                                <EdgePreview handleEdgeSide={handleEdgeSide}/>
                                <div className="field position">
                                    <label className="edge-width">Вибрати ширину кромки:</label>
                                    <select
                                        onChange={handleChangeSelect}
                                        name="edge-width"
                                        id="edge-width"

                                    >
                                        <option value="">Виберіть ширину кромки </option>
                                        <option value="22*0.6">22*0.6 </option>
                                        <option value="22*2">22*2</option>
                                        <option value="42*2">42*2</option>
                                    </select>
                                </div>
                            </div>
                        ) : null}
                    </div>
                    <button type="submit">Відправити до корзини</button>
                </form>
            </div>
        </section>
    );
};

// OptionSection.propTypes = {};

export default OptionSection;
