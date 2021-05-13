'use strict';

// localStorage.setItem(
// 	'datas',
// 	JSON.stringify([
// 		{ id: 1, name: 'Illia', typeId: 1, email: 'ill@home.ua' },
// 		{ id: 2, name: 'Tolik', typeId: 2, email: 't@home.ua' },
// 		{ id: 3, name: 'Maryana', typeId: 3, email: 'm@home.ua' },
// 		{ id: 4, name: 'Toma', typeId: 3, email: 'iam@home.ua' }
// 	])
// );

let userService = {
	types: [ { id: 0, name: '' }, { id: 1, name: 'Admin' }, { id: 2, name: 'Manager' }, { id: 3, name: 'User' } ],

	setUserData: function(value) {
		localStorage.setItem('datas', JSON.stringify(value));
	},

	getUserData: function() {
		let arrData = JSON.parse(localStorage.getItem('datas'));
		return arrData;
	},

	getDataForTable: function(searchStr, typef, sortedParameter, sortedAsc) {
		let result = [];
		let arrData = this.getUserData();
		for (let i = 0; i < arrData.length; i++) {
			if (
				(!searchStr || arrData[i].name.includes(searchStr) || arrData[i].email.includes(searchStr)) &&
				(!parseInt(typef) || typef == arrData[i].typeId)
			) {
				result[result.length] = {
					name: arrData[i].name,
					email: arrData[i].email,
					typeName: this.getTypeName(arrData[i].typeId),
					id: arrData[i].id
				};
			}
		}
		this.sort(result, sortedParameter, sortedAsc);
		return result;
	},

	updateUser: function(idUser, arr) {
		const data = this.getUserData();
		let ind = data.findIndex((el) => {
			return el.id == idUser;
		});
		data[ind] = arr;
	},

	findUserById: function(idUser) {
		let arrData = this.getUserData();
		for (let i = 0; i < arrData.length; i++) {
			if (arrData[i].id === idUser) {
				return {
					nameUser: arrData[i].name,
					emailUser: arrData[i].email,
					typeIdUser: arrData[i].typeId,
					id: arrData[i].id,
					ind: i
				};
			}
		}
		return null;
	},

	findUserByName: function(nameUserFind) {
		let arrData = this.getUserData();
		for (let i = 0; i < arrData.length; i++) {
			if (arrData[i].name === nameUserFind) {
				return {
					nameUser: arrData[i].name,
					emailUser: arrData[i].email,
					typeIdUser: arrData[i].typeId,
					id: arrData[i].id,
					ind: i
				};
			}
		}
		return null;
	},

	sort: function(array, sortedParameter, sortedAsc) {
		if (sortedAsc === false) {
			array.sort(function(a, b) {
				return a[sortedParameter] === b[sortedParameter] ? 0 : a[sortedParameter] < b[sortedParameter] ? -1 : 1;
			});
		} else {
			array.sort(function(a, b) {
				return a[sortedParameter] === b[sortedParameter] ? 0 : a[sortedParameter] > b[sortedParameter] ? -1 : 1;
			});
		}
	},

	getTypeName: function(typeId) {
		const types = this.types;
		let ind = types.findIndex((el) => {
			return el.id == typeId;
		});
		return types[ind].name;
	},

	getArreyTypes: function() {
		let arrTypes = [];
		for (let i = 0; i < this.types.length; i++) {
			arrTypes[arrTypes.length] = {
				id: this.types[i].id,
				name: this.types[i].name
			};
		}
		return arrTypes;
	},

	saveEditUser: function(ind, idUser, editName, editType, editEMail) {
		let arrData = this.getUserData();
		arrData[ind] = {
			id: idUser,
			name: editName,
			typeId: editType,
			email: editEMail
		};
		this.setUserData(arrData);
	},

	deleteUser: function(elem) {
		let arrData = this.getUserData();
		let ind = arrData.findIndex((el) => {
			return el.id == elem;
		});
		arrData.splice(ind, 1);
		this.setUserData(arrData);
	},

	deleteUsers: function(arrUserIds) {
		for (let i = 0; i < arrUserIds.length; i++) {
			this.deleteUser(arrUserIds[i]);
		}
	},

	createNewUser: function(newName, newEmail, newType) {
		let arrData = this.getUserData();
		let idNewUser = arrData.length;
		let duplicate = false;
		for (let i = 0; i < arrData.length; i++) {
			if (newName.value === arrData[i].name && newEmail.value === arrData[i].email) {
				duplicate = true;
				alert('This user does exist!');
				break;
			}
		}
		if (duplicate != true) {
			arrData.push({
				id: idNewUser,
				name: newName.value.charAt(0).toUpperCase() + newName.value.slice(1),
				typeId: newType.value,
				email: newEmail.value
			});
		}
		this.setUserData(arrData);
	}
};

// updateUser: function(idUser, arr) {
// 	const data = this.data;
// 	let ind = data.findIndex((el) => {
// 		return el.id == idUser;
// 	});
// 	this.data[ind] = arr;
// },

// findUserById: function(idUser) {
// 	for (let i = 0; i < this.data.length; i++) {
// 		if (this.data[i].id === idUser) {
// 			return {
// 				nameUser: this.data[i].name,
// 				emailUser: this.data[i].email,
// 				typeIdUser: this.data[i].typeId,
// 				id: this.data[i].id,
// 				ind: i
// 			};
// 		}
// 	}
// 	return null;
// },

// findUserByName: function(nameUserFind) {
// 	for (let i = 0; i < this.data.length; i++) {
// 		if (this.data[i].name === nameUserFind) {
// 			return {
// 				nameUser: this.data[i].name,
// 				emailUser: this.data[i].email,
// 				typeIdUser: this.data[i].typeId,
// 				id: this.data[i].id,
// 				ind: i
// 			};
// 		}
// 	}
// 	return null;
// },

// sort: function(array, sortedParameter, sortedAsc) {
// 	if (sortedAsc === false) {
// 		array.sort(function(a, b) {
// 			return a[sortedParameter] === b[sortedParameter] ? 0 : a[sortedParameter] < b[sortedParameter] ? -1 : 1;
// 		});
// 	} else {
// 		array.sort(function(a, b) {
// 			return a[sortedParameter] === b[sortedParameter] ? 0 : a[sortedParameter] > b[sortedParameter] ? -1 : 1;
// 		});
// 	}
// },

// getTypeName: function(typeId) {
// 	const types = this.types;
// 	let ind = types.findIndex((el) => {
// 		return el.id == typeId;
// 	});
// 	return types[ind].name;
// },

// getArreyTypes: function() {
// 	let arrTypes = [];
// 	for (let i = 0; i < this.types.length; i++) {
// 		arrTypes[arrTypes.length] = {
// 			id: this.types[i].id,
// 			name: this.types[i].name
// 		};
// 	}
// 	return arrTypes;
// },

// saveEditUser: function(ind, idUser, editName, editType, editEMail) {
// 	this.data[ind] = {
// 		id: idUser,
// 		name: editName,
// 		typeId: editType,
// 		email: editEMail
// 	};
// },

// deleteUser: function(elem) {
// 	let ind = this.data.findIndex((el) => {
// 		return el.id == elem;
// 	});
// 	this.data.splice(ind, 1);
// },

// deleteUsers: function(arrUserIds) {
// 	for (let i = 0; i < arrUserIds.length; i++) {
// 		this.deleteUser(arrUserIds[i]);
// 	}
// },

// createNewUser: function(newName, newEmail, newType) {
// 	let idNewUser = this.data.length;
// 	let duplicate = false;
// 	for (let i = 0; i < this.data.length; i++) {
// 		if (newName.value === this.data[i].name && newEmail.value === this.data[i].email) {
// 			duplicate = true;
// 			alert('This user does exist!');
// 			break;
// 		}
// 	}
// 	if (duplicate != true) {
// 		this.data.push({
// 			id: idNewUser,
// 			name: newName.value.charAt(0).toUpperCase() + newName.value.slice(1),
// 			typeId: newType.value,
// 			email: newEmail.value
// 		});
// 	}
// },

// getDataForTable: function(searchStr, typef, sortedParameter, sortedAsc) {
// 	let result = [];
// 	for (let i = 0; i < this.data.length; i++) {
// 		if (
// 			(!searchStr || this.data[i].name.includes(searchStr) || this.data[i].email.includes(searchStr)) &&
// 			(!parseInt(typef) || typef == this.data[i].typeId)
// 		) {
// 			result[result.length] = {
// 				name: this.data[i].name,
// 				email: this.data[i].email,
// 				typeName: this.getTypeName(this.data[i].typeId),
// 				id: this.data[i].id
// 			};
// 		}
// 	}
// 	this.sort(result, sortedParameter, sortedAsc);
// 	return result;
// }
