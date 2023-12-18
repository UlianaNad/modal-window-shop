import { createContext, useEffect, useMemo, useState } from 'react';

export const ProductContext = createContext();

export const ContextProvider = ({ children }) => {
  const [product, setProduct] = useState({});
  const [language, setLanguage] = useState('ua');
  const [edgeSide, setEdgeSide] = useState([]);
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);
  const [patternDirection, setPatternDirection] = useState('horizontal');
  const [edgeWidth, setEdgeWidth] = useState(null);
  const [customAmount, setCustomAmount] = useState(null);
  const [comment, setComment] = useState('');
  const [detailsList, setDetailsList] = useState([]);
  const chosenProduct = productItem => {
    setProduct(productItem);
  };

  const computedValues = useMemo(() => {
    const startSquare = product
      ? product?.dimensions?.width * product?.dimensions?.height
      : 0;

    const customSquare = width && height ? width * height : 0;

    const possibleAmountOfPieces =
      startSquare !== 0 && customSquare !== 0
        ? Math.ceil(startSquare / customSquare)
        : 0;

    const cutItemPrice =
      customAmount !== null
        ? Math.round(product?.offers?.price / possibleAmountOfPieces)
        : null;
    const AmountOfCustomParticles = customAmount
      ? Math.ceil(customAmount / possibleAmountOfPieces)
      : 0;
    const totalPrice =
      customAmount && AmountOfCustomParticles > 0
        ? Math.round(product?.offers.price * AmountOfCustomParticles)
        : null;

    return {
      possibleAmountOfPieces,
      cutItemPrice,
      AmountOfCustomParticles,
      totalPrice,
    };
  }, [product, width, height, customAmount]);

  // hover content

  const hoverContent = {
    dimensionsContent:
      'Розіміри (Введіть розміри для висоти та ширини вашого продукту в міліметрах (мм). Турбуєтеся про точність? Ми використовуємо новітню технологію різання ЧПК для точного різання з допуском +/- 1 мм)',
    totalAmountContent:
      'Загальна кількість деталей по заданим розмірам (Потрібно вказати необхідну кількість деталей, яку необхідно порізати. Зауважте, що деталі вже мають задані розміри)',
    edgeContent:
      'Кромка (Асортимент продукції, представлений на нашому сайті, пропонує кромку в розмірах 42мм/2,0 мм, 22мм/0,6мм, 22мм/2,0мм і т.д. різного колірного рішення. За допомогою кромки можна виконати якісне облицювання торцевих поверхонь ДСП, створити декор-елемент у виготовленні корпусних меблів. Потрібно вибрати сторони, які кромкувати, чи не кромкувати взагалі.',
    rotationContent:
      'Обертання текстури (Важливо враховувати напрям текстури при замовленні порізки  плитних матеріалів, тому що деякі плитні матеріали можуть мати виражену текстуру або малюнок, і обертання їх може впливати на те, як ця текстура виглядає на поверхні.)',
    commentContent:
      'Залишити коментар (Вкажіть колір кромки, наявність радіусів, пазів, кутів тощо, а також їх розміри)',
  };

  const createDetailList = (index) => {
      setDetailsList(prevDetails => [
        ...prevDetails,
        {
          productId:product.id,
          detailId: index + 1,
          width,
          height,
          patternDirection,
          edgeSide,
          edgeWidth,
          customAmount,
          comment,
        },
      ]);
  };

  useEffect(() => {
    window.localStorage.setItem(`DetailToCut`, JSON.stringify(detailsList));
  },[detailsList])

  const clearStates = () => {
    setEdgeSide([]);
    setWidth(null);
    setHeight(null);
    setPatternDirection('horizontal');
    setEdgeWidth(null);
    setCustomAmount(null);
    setComment('');
  };
  const contextValue = {
    product,
    chosenProduct,
    setLanguage,
    language,
    setEdgeSide,
    setWidth,
    setHeight,
    setPatternDirection,
    setEdgeWidth,
    setCustomAmount,
    setComment,
    edgeSide,
    width,
    height,
    patternDirection,
    edgeWidth,
    customAmount,
    comment,
    computedValues,
    hoverContent,
    createDetailList,
    clearStates,
    detailsList
  };
  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};
