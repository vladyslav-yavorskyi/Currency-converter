import './styles/index.scss';
import { Converter } from './converter/converter.js';

// new Converter('#converter', {
//   PLNtoRUB: {
//     from: '🇵🇱',
//     to: '🇷🇺',
//     rate: 20.06,
//   },
//   EUROtoPLN: {
//     from: '🇪🇺',
//     to: '🇵🇱',
//     rate: 4.46,
//   },
//   USDtoUAH: {
//     from: '🇺🇸',
//     to: '🇺🇦',
//     rate: 27.67,
//   },
//   PLNtoUAH: {
//     from: '🇵🇱',
//     to: '🇺🇦',
//     rate: 7.45,
//   },
// });

new Converter('#converter', {
  data: [
    { id: '1', from: '🇵🇱', to: '🇷🇺', rate: 20.06 },
    { id: '2', from: '🇪🇺', to: '🇵🇱', rate: 4.46 },
    { id: '3', from: '🇺🇸', to: '🇺🇦', rate: 27.67 },
    { id: '4', from: '🇵🇱', to: '🇺🇦', rate: 7.45 },
  ],
  selectedId: '1',
});
