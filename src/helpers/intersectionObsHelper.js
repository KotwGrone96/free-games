export const viewMore = (arr, num, lastIndex) => {
  let newArr = [];
  let noMore = false;

  for (let index = 0; index < num; index++) {
    if (arr.length - 1 == lastIndex) {
      noMore = true;
      break;
    }
    newArr = [...newArr, arr[lastIndex]];
    lastIndex++;
  }

  return { newArr, lastIndex, noMore };
};

//  DESARROLLAR HOOK

// export default function useIntersectionObs(options = { threshold: 0.5 }) {
//   const [entries, setEntries] = useState([]);
//   const [elements, setElements] = useState([]);
//   const [lastGameVisible, setLastGameVisible] = useState(0);
//   const [noMoreData, setNoMoreData] = useState(false);

//   const observer = useRef(new IntersectionObserver((entries) => setEntries(entries), options));

//   useEffect(() => {
//     const lastItem = elements[elements.length - 1];
//     entries.forEach((entry) => {
//       if (entry.isIntersecting) {
//         observer.current.unobserve(entry.target);
//         if (entry.target === lastItem) {
//           console.log('AGREGANDO MAS');
//           const { newArr, lastIndex, noMore } = viewMore(list, 20, lastGameVisible);
//           setElements(elements.concat(newArr));
//           setLastGameVisible(lastIndex);
//           noMore ? setNoMoreData(noMore) : '';
//         }
//       }
//     });
//   }, [entries, observer]);

//   return [observer.current, elements, setElements, noMoreData];
// }
