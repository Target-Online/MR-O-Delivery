import React from 'react';
import Svg, { G,Polygon ,Path, SvgProps } from 'react-native-svg';

const OfflineIcon = (props, ref) => (
  <Svg height="80" viewBox="0 -5 512 511" width="80" xmlns="http://www.w3.org/2000/svg">
	  <Path d="m500.777344 256.5c0 135.308594-109.691406 245-245 245-135.3125 0-245-109.691406-245-245s109.6875-245 245-245c135.308594 0 245 109.691406 245 245zm0 0" fill="#ef3a50"/>
	  <Path d="m244.496094 57.761719c3.546875 1.488281 7.441406 2.3125 11.527344 2.3125 3.933593 0 7.683593-.769531 11.121093-2.15625l64.613281 111.917969h17.320313l-69.8125-120.929688c4.089844-5.097656 6.542969-11.570312 6.542969-18.621094 0-16.449218-13.335938-29.785156-29.785156-29.785156-16.453126 0-29.789063 13.335938-29.789063 29.785156 0 6.886719 2.339844 13.21875 6.261719 18.261719l-70.023438 121.289063h17.320313zm0 0" fill="#6843af"/>
	  <Path d="m285.808594 30.285156c0 16.453125-13.335938 29.789063-29.785156 29.789063-16.453126 0-29.789063-13.335938-29.789063-29.789063 0-16.449218 13.335937-29.785156 29.789063-29.785156 16.449218 0 29.785156 13.335938 29.785156 29.785156zm0 0" fill="#71a2ea"/>
	  <Path d="m244.808594 30.285156c0-13.207031 8.597656-24.398437 20.5-28.300781-2.921875-.957031-6.042969-1.484375-9.285156-1.484375-16.453126 0-29.789063 13.335938-29.789063 29.785156 0 16.453125 13.335937 29.789063 29.789063 29.789063 3.242187 0 6.363281-.527344 9.285156-1.484375-11.902344-3.902344-20.5-15.097656-20.5-28.304688zm0 0" fill="#578dce"/>
	  <Path d="m200.71875 133.585938h-17.320312l-20.925782 36.25h17.320313zm0 0" fill="#50309e"/>
	  <Path d="m328.152344 133.585938h-17.320313l20.929688 36.25h17.316406zm0 0" fill="#50309e"/>
	  <Path d="m497 354.371094h-482c-8.285156 0-15-6.71875-15-15v-165.742188c0-8.28125 6.714844-15 15-15h482c8.285156 0 15 6.71875 15 15v165.742188c0 8.28125-6.714844 15-15 15zm0 0" fill="#ef3a50"/>
	  <Path d="m497 354.371094h-482c-8.285156 0-15-6.71875-15-15v-165.742188c0-8.28125 6.714844-15 15-15h482c8.285156 0 15 6.71875 15 15v165.742188c0 8.28125-6.714844 15-15 15zm0 0" fill="#fdd33a"/>
	  <Path d="m497 339.613281h-420.207031c-8.28125 0-14.996094-6.710937-15-14.996093-.003907-40.835938-.011719-150.984376-.011719-150.984376 0-8.285156 6.71875-15 15-15h-61.78125c-8.285156 0-15 6.714844-15 15v165.738282c0 8.28125 6.714844 15 15 15h482c8.285156 0 15-6.71875 15-15v-14.757813c0 8.28125-6.714844 15-15 15zm0 0" fill="#e0af24"/>
	  <G fill="#fff">
		  <Path d="m95 289.230469c-5.121094-5.078125-7.683594-11.222657-7.683594-18.429688v-38.34375c0-7.167969 2.5625-13.3125 7.683594-18.433593 5.078125-5.078126 11.222656-7.617188 18.433594-7.617188 7.207031 0 13.351562 2.539062 18.433594 7.617188 5.117187 5.121093 7.679687 11.265624 7.679687 18.433593v38.34375c0 7.210938-2.5625 13.351563-7.679687 18.433594-5.082032 5.121094-11.226563 7.679687-18.433594 7.679687-7.210938 0-13.355469-2.5625-18.433594-7.683593zm8.109375-67.09375c-2.867187 2.867187-4.300781 6.308593-4.300781 10.324219v38.339843c0 4.015625 1.433594 7.457031 4.300781 10.320313 2.828125 2.867187 6.269531 4.300781 10.320313 4.300781 4.015624 0 7.457031-1.433594 10.324218-4.300781 2.867188-2.863282 4.300782-6.308594 4.300782-10.320313v-38.339843c0-4.015626-1.433594-7.457032-4.300782-10.324219-2.867187-2.824219-6.308594-4.238281-10.324218-4.238281-4.050782 0-7.492188 1.410156-10.320313 4.238281zm0 0"/>
		  <Path d="m162.710938 220.046875v23.839844h20.890624c1.597657 0 2.96875.554687 4.117188 1.660156 1.105469 1.105469 1.65625 2.457031 1.65625 4.054687 0 1.597657-.550781 2.949219-1.65625 4.054688-1.148438 1.148438-2.523438 1.722656-4.117188 1.722656h-20.890624v35.761719c0 1.597656-.554688 2.96875-1.660157 4.113281-1.148437 1.105469-2.5 1.660156-4.054687 1.660156-1.597656 0-2.972656-.554687-4.117188-1.660156-1.105468-1.144531-1.660156-2.519531-1.660156-4.113281v-76.867187c0-1.554688.554688-2.90625 1.660156-4.054688 1.144532-1.105469 2.519532-1.660156 4.117188-1.660156h30.289062c1.601563 0 2.949219.554687 4.058594 1.660156 1.144531 1.144531 1.71875 2.5 1.71875 4.054688 0 1.597656-.574219 2.949218-1.71875 4.054687-1.105469 1.148437-2.457031 1.722656-4.058594 1.722656h-24.574218zm0 0"/>
		  <Path d="m214.382812 220.046875v23.839844h20.890626c1.597656 0 2.96875.554687 4.117187 1.660156 1.105469 1.105469 1.660156 2.457031 1.660156 4.054687 0 1.597657-.554687 2.949219-1.660156 4.054688-1.148437 1.148438-2.519531 1.722656-4.117187 1.722656h-20.890626v35.761719c0 1.597656-.554687 2.96875-1.65625 4.113281-1.148437 1.105469-2.5 1.660156-4.058593 1.660156-1.597657 0-2.96875-.554687-4.113281-1.660156-1.109376-1.144531-1.660157-2.519531-1.660157-4.113281v-76.867187c0-1.554688.550781-2.90625 1.660157-4.054688 1.144531-1.105469 2.515624-1.660156 4.113281-1.660156h30.292969c1.597656 0 2.949218.554687 4.054687 1.660156 1.144531 1.144531 1.722656 2.5 1.722656 4.054688 0 1.597656-.574219 2.949218-1.722656 4.054687-1.105469 1.148437-2.457031 1.722656-4.054687 1.722656h-24.578126zm0 0"/>
		  <Path d="m293.523438 285.421875c1.597656 0 2.949218.554687 4.054687 1.660156 1.144531 1.148438 1.71875 2.5 1.71875 4.054688 0 1.597656-.574219 2.972656-1.71875 4.117187-1.105469 1.105469-2.457031 1.660156-4.054687 1.660156h-33.179688c-1.601562 0-2.972656-.554687-4.117188-1.660156-1.105468-1.144531-1.660156-2.519531-1.660156-4.117187v-77.910157c0-1.597656.554688-2.949218 1.660156-4.054687 1.144532-1.144531 2.519532-1.71875 4.117188-1.71875 1.554688 0 2.90625.574219 4.054688 1.71875 1.105468 1.105469 1.660156 2.457031 1.660156 4.054687v72.195313zm0 0"/>
		  <Path d="m310.789062 295.253906c-1.105468-1.144531-1.660156-2.519531-1.660156-4.117187v-79.015625c0-1.597656.554688-2.949219 1.660156-4.054688 1.144532-1.105468 2.519532-1.660156 4.113282-1.660156 1.558594 0 2.910156.554688 4.058594 1.660156 1.105468 1.105469 1.65625 2.457032 1.65625 4.054688v79.015625c0 1.597656-.550782 2.972656-1.65625 4.117187-1.148438 1.105469-2.5 1.660156-4.058594 1.660156-1.59375 0-2.96875-.554687-4.113282-1.660156zm0 0"/>
		  <Path d="m385.011719 291.445312c0 .246094-.023438.46875-.0625.675782v.121094c-.371094 1.84375-1.375 3.175781-3.011719 3.996093-1.433594.734375-2.886719.859375-4.363281.367188-1.515625-.492188-2.640625-1.433594-3.378907-2.828125l-28.570312-57.261719v54.621094c0 1.597656-.554688 2.949219-1.65625 4.054687-1.148438 1.148438-2.5 1.722656-4.058594 1.722656-1.597656 0-2.96875-.574218-4.113281-1.722656-1.109375-1.105468-1.660156-2.457031-1.660156-4.054687v-79.015625c0-1.597656.550781-2.949219 1.660156-4.054688 1.144531-1.148437 2.515625-1.722656 4.113281-1.722656 1.804688 0 3.296875.738281 4.484375 2.210938v.0625c.164063.164062.308594.390624.433594.675781.039063 0 .078125.023437.121094.0625 0 .082031.019531.125.0625.125l28.570312 57.261719v-54.621094c0-1.597656.554688-2.949219 1.660157-4.054688 1.105468-1.144531 2.457031-1.722656 4.054687-1.722656s2.949219.574219 4.054687 1.722656c1.144532 1.105469 1.722657 2.457032 1.722657 4.054688v79.015625c0-.121094 0-.183594 0-.183594s-.023438.164063-.0625.492187zm0 0"/>
		  <Path d="m434.65625 285.421875c1.597656 0 2.949219.554687 4.054688 1.660156 1.148437 1.148438 1.722656 2.5 1.722656 4.054688 0 1.597656-.574219 2.972656-1.722656 4.117187-1.105469 1.105469-2.457032 1.660156-4.054688 1.660156h-30.292969c-1.597656 0-2.96875-.554687-4.113281-1.660156-1.105469-1.144531-1.660156-2.519531-1.660156-4.117187v-76.863281c0-1.558594.554687-2.910157 1.660156-4.054688 1.144531-1.109375 2.519531-1.660156 4.113281-1.660156h30.292969c1.597656 0 2.949219.550781 4.054688 1.660156 1.148437 1.144531 1.722656 2.496094 1.722656 4.054688 0 1.597656-.574219 2.949218-1.722656 4.054687-1.105469 1.148437-2.457032 1.722656-4.054688 1.722656h-24.578125v23.839844h20.894531c1.59375 0 2.96875.550781 4.113282 1.65625 1.105468 1.105469 1.660156 2.457031 1.660156 4.054687 0 1.597657-.554688 2.949219-1.660156 4.058594-1.144532 1.144532-2.519532 1.71875-4.113282 1.71875h-20.894531v30.046875h24.578125zm0 0"/>
		  </G>
		  <Path d="m469.886719 375.644531h-123.75c-4.828125 0-8.738281 3.910157-8.738281 8.738281v.867188c0 4.824219 3.910156 8.734375 8.738281 8.734375h18.769531c5.066406 0 9.171875 4.105469 9.171875 9.171875 0 4.519531-3.277344 8.269531-7.582031 9.023438h-58.375c-6.796875 0-12.308594 5.507812-12.308594 12.304687s5.511719 12.304687 12.308594 12.304687h52.671875c5.242187 0 9.492187 4.25 9.492187 9.496094 0 5.242188-4.25 9.496094-9.492187 9.496094h-19.75c-4.824219 0-8.738281 3.910156-8.738281 8.734375v1.519531c0 4.824219 3.914062 8.734375 8.738281 8.734375h26.125c43.28125-22.132812 79.09375-56.765625 102.71875-99.125zm0 0" fill="#f94e6b"/>
		  <Path d="m130.515625 115.925781v-1.410156c0-4.484375-3.632813-8.121094-8.117187-8.121094h-18.359376c-4.875 0-8.828124-3.953125-8.828124-8.824219 0-4.875 3.953124-8.828124 8.828124-8.828124h48.960938c6.316406 0 11.4375-5.121094 11.4375-11.4375 0-6.316407-5.121094-11.441407-11.4375-11.441407h-51.101562c-20.363282 16.457031-38.042969 36.101563-52.261719 58.183594h72.761719c4.484374 0 8.117187-3.636719 8.117187-8.121094zm0 0" fill="#f94e6b"/>
		  <Path d="m141.40625 442.097656v-1.53125c0-4.855468-3.9375-8.792968-8.792969-8.792968h-19.882812c-5.277344 0-9.554688-4.28125-9.554688-9.558594s4.277344-9.558594 9.554688-9.558594h53.023437c6.84375 0 12.390625-5.542969 12.390625-12.386719 0-6.839843-5.546875-12.386719-12.390625-12.386719h-116.800781c15.425781 24.234376 34.996094 45.5625 57.707031 63.007813h25.953125c4.855469 0 8.792969-3.9375 8.792969-8.792969zm0 0" fill="#f94e6b"/>
	</Svg>
);

export default OfflineIcon;
