import * as actionTypes from "./shopping-types";

const INITIAL_STATE = {
  products: [
    {
      id: 1,
      title: "Hızlı ve Yavaş Düşünme",
      description:
        "Hızlı ve Yavaş Düşünme Nobel ödüllü Daniel Kahneman'ın insanın düşünce yapısı ve karar alış mekanizmaları üzerine yazığı kitabı. 2011 yılının en çok satılan kitapları arasındadır. Türkçeye Varlık Yayınları tarafından kazandırımıştır. ",
      price: 25.0,
      image:
        "https://images-na.ssl-images-amazon.com/images/I/31IPe3HQskL.jpg",
    },
    {
      id: 2,
      title: "Hitchcock",
      description:
        "Hitchcock / Truffaut, François Truffaut'un Alfred Hitchcock ile ilgili 1966 tarihli bir kitabı olup, başlangıçta Le Cinéma selon Alfred Hitchcock olarak Fransızca olarak yayınlanmıştır.",
      price: 20.0,
      image:
        "https://images-na.ssl-images-amazon.com/images/I/51lur-f-gVL._SX389_BO1,204,203,200_.jpg",
    },
    {
      id: 3,
      title: "Bir Ekonomik Tetikçinin İtirafları",
      description:
        "ABD'de tam 24 yayınevinin yayınlamaya korktuğu, yazarın 5 kez yazmaya karar verip, her seferinde rüşvet ve tehdilerle vazgeçirildiği, yayınlandığı ülkelerde gündemi sarsan, tüyler ürperten gerçekler. 23. Ülke Türkiye Ve Dünya Uyanmaya Devam Ediyor.",
      price: 15.0,
      image:
        "https://images-na.ssl-images-amazon.com/images/I/51l6B3Y0olL.jpg",
    },
  ],
  cart: [],
  currentItem: null,
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      // Great Item data from products array
      const item = state.products.find(
        (product) => product.id === action.payload.id
      );
      // Check if Item is in cart already
      const inCart = state.cart.find((item) =>
        item.id === action.payload.id ? true : false
      );

      return {
        ...state,
        cart: inCart
          ? state.cart.map((item) =>
              item.id === action.payload.id
                ? { ...item, qty: item.qty + 1 }
                : item
            )
          : [...state.cart, { ...item, qty: 1 }],
      };
    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };
    case actionTypes.ADJUST_ITEM_QTY:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, qty: +action.payload.qty }
            : item
        ),
      };
    case actionTypes.LOAD_CURRENT_ITEM:
      return {
        ...state,
        currentItem: action.payload,
      };
    default:
      return state;
  }
};

export default shopReducer;
