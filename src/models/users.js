import { observable } from 'mobx';

// for caching users data
const users = observable.map({});

window.users = users;

// for caching users lists
const users_lists = {}

// get list of users by url
export const getList = ( url = '/api/users' ) => {
	
	// use cached data if exists
	if( users_lists[ url ] ){
		return Promise.resolve( users_lists[ url ] );
	}
	
	// when api is ready
	// fetch( url ).then();
	
	// make request ( fake for now )
	return new Promise(( resolve, reject ) => {
		setTimeout(() => {
			const result = fake_lists[ url ];
			
			if( !result || !result.users ){
				reject();
				return;
			}
			
			// cache data and prepare for return
			users_lists[ url ] = Object.assign({}, result, { users: [] });
			result.users.forEach( user => {
				users.set( user.id, user );
				users_lists[ url ].users.push( users.get( user.id ) );
			});
			
			resolve( users_lists[ url ] );
		}, 700);
	});
}

// get user by id
export const getUser = id => {
	
	// use cached data if exists
	if( users.get( id ) ){
		return Promise.resolve( users.get( id ) );
	}
	
	// when api is ready
	// fetch( url ).then();
	
	// make request ( fake for now )
	return new Promise(( resolve, reject ) => {
		setTimeout(() => {
			const user = fake_users_by_id[ id ];
			
			if( !user ){
				reject();
				return;
			}
			
			// cache data
			users.set( id, user );
			
			resolve( users.get( id ) );
		}, 1500);
	});
}

// save user name and update cached object
export const saveName = ( id, name ) => {
	users.get( id ).name = name;
	// make save request here, when api is ready
	return new Promise( resolve => {
		setTimeout(() => {
			resolve();
		}, 700);
	});
}

// fake source of data
const fake_lists = {
	'/api/users': {
		users: [{"id":"268092690","avatarUrl":"https://pp.userapi.com/c824200/v824200221/22628/S30So_5Vz9A.jpg","name":"Наталья Баландина"},{"id":"47114360","avatarUrl":"https://pp.userapi.com/c638120/v638120203/5606d/t_GephsTbow.jpg","name":"Александра Магер"},{"id":"106172362","avatarUrl":"https://pp.userapi.com/c638826/v638826362/36a99/ZHAtjCEBteM.jpg","name":"Елена Амирова"},{"id":"119491","avatarUrl":"https://pp.userapi.com/c10366/u119491/d_967540b7.jpg","name":"Алекс Калугин"},{"id":"177085931","avatarUrl":"https://pp.userapi.com/c304302/u177085931/d_b0301246.jpg","name":"Max Sorokin"},{"id":"45507432","avatarUrl":"https://pp.userapi.com/c841622/v841622025/43d62/dWX16K4mQU4.jpg","name":"Регина Садриева"},{"id":"391614594","avatarUrl":"https://pp.userapi.com/c639721/v639721594/157f2/KmyOvb1VuTM.jpg","name":"Алекс Лесли"},{"id":"56308630","avatarUrl":"https://pp.userapi.com/c824604/v824604944/16e68/uHdejyJKC_E.jpg","name":"Олег Ласточкин"},{"id":"445997239","avatarUrl":"https://vk.com/images/deactivated_200.png","name":"Марианна Овчинникова"},{"id":"55629489","avatarUrl":"https://pp.userapi.com/c637324/v637324599/93cc6/eiXRCfY6clw.jpg","name":"Родион Шумаков"},{"id":"454375786","avatarUrl":"https://vk.com/images/deactivated_200.png","name":"Настя Венкова"},{"id":"6440884","avatarUrl":"https://pp.userapi.com/c626316/v626316884/5348a/rQSQcno7iUw.jpg","name":"Вячеслав Гримальский"}],
		next: '/api/users/2',
		prev: null,
	},
	'/api/users/2': {
		users: [{"id":"103211309","avatarUrl":"https://pp.userapi.com/c639120/v639120309/201ab/_Fcgt27ac5g.jpg","name":"Женя Московский"},{"id":"59268881","avatarUrl":"https://pp.userapi.com/c841631/v841631808/30af5/ZVPNf3mswvg.jpg","name":"Евгения Овчаренко"},{"id":"50651142","avatarUrl":"https://pp.userapi.com/c630223/v630223142/47826/sLELR1Iy2Go.jpg","name":"Vadim Arefjev"},{"id":"456656062","avatarUrl":"https://vk.com/images/camera_200.png","name":"Ваыпа Ва"},{"id":"567033","avatarUrl":"https://pp.userapi.com/c841033/v841033471/a587/R8kZzCN96B4.jpg","name":"Алексей Лазутин"},{"id":"28563040","avatarUrl":"https://pp.userapi.com/c629228/v629228040/174e2/QhSSC5yKEsc.jpg","name":"Денис Везёнов"},{"id":"453848825","avatarUrl":"https://vk.com/images/deactivated_200.png","name":"Екатерина Ершова"},{"id":"2151995","avatarUrl":"https://pp.userapi.com/c840539/v840539869/6202/vDyuPG3b1_k.jpg","name":"Вадим Иоффе"},{"id":"4916664","avatarUrl":"https://pp.userapi.com/c616118/v616118664/1b333/xqTuNoMOBN8.jpg","name":"Антон Shkod"},{"id":"184681155","avatarUrl":"https://pp.userapi.com/c624522/v624522155/5d51d/oB3IuDe1ZrE.jpg","name":"Алексей Антипов"},{"id":"48636286","avatarUrl":"https://pp.userapi.com/c840536/v840536606/1af92/SOFLCV4NTRA.jpg","name":"Анастасия Исаева"},{"id":"454659822","avatarUrl":"https://vk.com/images/deactivated_200.png","name":"Екатерина Шпакова"},{"id":"456033289","avatarUrl":"https://pp.userapi.com/c840227/v840227645/448c4/Nx0TU_GV1AQ.jpg","name":"Anna Mirs"}],
		next: '/api/users/3',
		prev: '/api/users',
	},
	'/api/users/3': {
		users: [
		{"id":"95005413","avatarUrl":"https://pp.userapi.com/c834304/v834304838/48a5d/nJHaoWJMYV0.jpg","name":"Лена Сычева"},{"id":"29492138","avatarUrl":"https://pp.userapi.com/c639918/v639918005/4770b/N5RgUGvgGC0.jpg","name":"Valentina Petrenko"},{"id":"18585011","avatarUrl":"https://pp.userapi.com/c621701/v621701654/3e370/O0ve93DloYU.jpg","name":"Florida Pyshkina"},{"id":"232014379","avatarUrl":"https://pp.userapi.com/c639829/v639829379/16e06/u7q1ihCZei4.jpg","name":"Тёма Мельников"},{"id":"452564493","avatarUrl":"https://vk.com/images/deactivated_200.png","name":"Елизавета Кириллова"}],
		next: null,
		prev: '/api/users/2',
	},
}

const fake_users_by_id = {"119491":{"id":"119491","avatarUrl":"https://pp.userapi.com/c10366/u119491/d_967540b7.jpg","name":"Алекс Калугин"},"567033":{"id":"567033","avatarUrl":"https://pp.userapi.com/c841033/v841033471/a587/R8kZzCN96B4.jpg","name":"Алексей Лазутин"},"2151995":{"id":"2151995","avatarUrl":"https://pp.userapi.com/c840539/v840539869/6202/vDyuPG3b1_k.jpg","name":"Вадим Иоффе"},"4916664":{"id":"4916664","avatarUrl":"https://pp.userapi.com/c616118/v616118664/1b333/xqTuNoMOBN8.jpg","name":"Антон Shkod"},"6440884":{"id":"6440884","avatarUrl":"https://pp.userapi.com/c626316/v626316884/5348a/rQSQcno7iUw.jpg","name":"Вячеслав Гримальский"},"18585011":{"id":"18585011","avatarUrl":"https://pp.userapi.com/c621701/v621701654/3e370/O0ve93DloYU.jpg","name":"Florida Pyshkina"},"28563040":{"id":"28563040","avatarUrl":"https://pp.userapi.com/c629228/v629228040/174e2/QhSSC5yKEsc.jpg","name":"Денис Везёнов"},"29492138":{"id":"29492138","avatarUrl":"https://pp.userapi.com/c639918/v639918005/4770b/N5RgUGvgGC0.jpg","name":"Valentina Petrenko"},"45507432":{"id":"45507432","avatarUrl":"https://pp.userapi.com/c841622/v841622025/43d62/dWX16K4mQU4.jpg","name":"Регина Садриева"},"47114360":{"id":"47114360","avatarUrl":"https://pp.userapi.com/c638120/v638120203/5606d/t_GephsTbow.jpg","name":"Александра Магер"},"48636286":{"id":"48636286","avatarUrl":"https://pp.userapi.com/c840536/v840536606/1af92/SOFLCV4NTRA.jpg","name":"Анастасия Исаева"},"50651142":{"id":"50651142","avatarUrl":"https://pp.userapi.com/c630223/v630223142/47826/sLELR1Iy2Go.jpg","name":"Vadim Arefjev"},"55629489":{"id":"55629489","avatarUrl":"https://pp.userapi.com/c637324/v637324599/93cc6/eiXRCfY6clw.jpg","name":"Родион Шумаков"},"56308630":{"id":"56308630","avatarUrl":"https://pp.userapi.com/c824604/v824604944/16e68/uHdejyJKC_E.jpg","name":"Олег Ласточкин"},"59268881":{"id":"59268881","avatarUrl":"https://pp.userapi.com/c841631/v841631808/30af5/ZVPNf3mswvg.jpg","name":"Евгения Овчаренко"},"95005413":{"id":"95005413","avatarUrl":"https://pp.userapi.com/c834304/v834304838/48a5d/nJHaoWJMYV0.jpg","name":"Лена Сычева"},"103211309":{"id":"103211309","avatarUrl":"https://pp.userapi.com/c639120/v639120309/201ab/_Fcgt27ac5g.jpg","name":"Женя Московский"},"106172362":{"id":"106172362","avatarUrl":"https://pp.userapi.com/c638826/v638826362/36a99/ZHAtjCEBteM.jpg","name":"Елена Амирова"},"177085931":{"id":"177085931","avatarUrl":"https://pp.userapi.com/c304302/u177085931/d_b0301246.jpg","name":"Max Sorokin"},"184681155":{"id":"184681155","avatarUrl":"https://pp.userapi.com/c624522/v624522155/5d51d/oB3IuDe1ZrE.jpg","name":"Алексей Антипов"},"232014379":{"id":"232014379","avatarUrl":"https://pp.userapi.com/c639829/v639829379/16e06/u7q1ihCZei4.jpg","name":"Тёма Мельников"},"268092690":{"id":"268092690","avatarUrl":"https://pp.userapi.com/c824200/v824200221/22628/S30So_5Vz9A.jpg","name":"Наталья Баландина"},"391614594":{"id":"391614594","avatarUrl":"https://pp.userapi.com/c639721/v639721594/157f2/KmyOvb1VuTM.jpg","name":"Алекс Лесли"},"445997239":{"id":"445997239","avatarUrl":"https://vk.com/images/deactivated_200.png","name":"Марианна Овчинникова"},"452564493":{"id":"452564493","avatarUrl":"https://vk.com/images/deactivated_200.png","name":"Елизавета Кириллова"},"453848825":{"id":"453848825","avatarUrl":"https://vk.com/images/deactivated_200.png","name":"Екатерина Ершова"},"454375786":{"id":"454375786","avatarUrl":"https://vk.com/images/deactivated_200.png","name":"Настя Венкова"},"454659822":{"id":"454659822","avatarUrl":"https://vk.com/images/deactivated_200.png","name":"Екатерина Шпакова"},"456033289":{"id":"456033289","avatarUrl":"https://pp.userapi.com/c840227/v840227645/448c4/Nx0TU_GV1AQ.jpg","name":"Anna Mirs"},"456656062":{"id":"456656062","avatarUrl":"https://vk.com/images/camera_200.png","name":"Ваыпа Ва"}}