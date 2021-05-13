'use strict';

let sort = 'name';
let sortedAsc = false;

function initPage() {
	drawTable();
	createDropDown('select');
}

function onClickButtonDefaultArray() {
	userService.setUserData([
		{ id: 1, name: 'Illia', typeId: 1, email: 'ill@home.ua' },
		{ id: 2, name: 'Tolik', typeId: 2, email: 't@home.ua' },
		{ id: 3, name: 'Maryana', typeId: 3, email: 'm@home.ua' },
		{ id: 4, name: 'Toma', typeId: 3, email: 'iam@home.ua' }
	]);
	drawTable();
}

function drawTable() {
	let filling = document.getElementById('filling');
	let newString = '';
	let searchFilter = document.getElementById('searchFilter').value;
	let typeFilter = document.getElementById('select').value;
	const usersArr = userService.getDataForTable(searchFilter, typeFilter, sort, sortedAsc);
	for (let i = 0; i < usersArr.length; i++) {
		newString =
			newString +
			`<tr onclick="onClickRow(this)" userId="${usersArr[i].id}">
				<td><span id="ondblclick" ondblclick = "ondblClickEditInLine(this, 'name')">${usersArr[i].name}</span></td>
				<td><span id="ondblclick" ondblclick = "ondblClickEditInLine(this)">${usersArr[i].email}</span></td>
				<td><span id="ondblclickType" ondblclick = "ondblClickEditInLineType(this)">${usersArr[i]
					.typeName}</span></td></tr>`;
	}
	filling.innerHTML = newString;
}

function ondblClickEditInLineType(container) {
	let select = document.createElement('SELECT');
	select.setAttribute('id', 'idSelectForEdit');
	let oldValue = container.innerHTML;
	select.value = oldValue;
	container.innerHTML = null;
	container.appendChild(select);
	createDropDown('idSelectForEdit');
	let idUser = parseInt(container.parentNode.parentNode.getAttribute('userId'));
	let arrUser = userService.findUserById(idUser);
	let id = arrUser.id;
	select.addEventListener('change', function(event) {
		arrUser.typeIdUser = event.target.value;
	});
	select.addEventListener('keydown', function(event) {
		if (event.key == 'Enter') {
			container.innerHTML = userService.getTypeName(select.value);
			userService.updateUser(id, arrUser);
		}
		if (event.key == 'Escape') {
			container.innerHTML = oldValue;
		}
	});
	select.addEventListener('blur', function() {
		container.innerHTML = oldValue;
	});
}

function ondblClickEditInLine(container, editAtr) {
	let input = document.createElement('input');
	let oldValue = container.innerHTML;
	input.value = oldValue;
	container.innerHTML = null;
	container.appendChild(input);
	let idUser = parseInt(container.parentNode.parentNode.getAttribute('userId'));
	let arrUser = userService.findUserById(idUser);
	let id = arrUser.id;
	input.addEventListener('keydown', function(event) {
		if (event.key == 'Enter') {
			container.innerHTML = input.value;
			if (editAtr === 'name') {
				arrUser.nameUser = input.value;
				userService.updateUser(id, arrUser);
			} else {
				arrUser.emailUser = input.value;
				userService.updateUser(id, arrUser);
			}
		}
		if (event.key == 'Escape') {
			container.innerHTML = oldValue;
		}
	});
	input.addEventListener('blur', function() {
		container.innerHTML = oldValue;
	});
}

function onInputSearchListener() {
	drawTable();
}

function createDropDown(idSelect) {
	const usersArr = userService.getArreyTypes();
	let contentDropDown = document.getElementById(idSelect);
	for (let i = 0; i < usersArr.length; i++) {
		let option = document.createElement('option');
		option.textContent = usersArr[i].name;
		option.value = usersArr[i].id;
		contentDropDown.appendChild(option);
	}
}

function onChangeTypeListener() {
	drawTable();
}

function onClickSortName(buttonSort) {
	if (buttonSort.value === 'down') {
		sortedAsc = false;
	} else {
		sortedAsc = true;
	}
	sort = 'name';
	if (buttonSort) {
		if (sortedAsc) {
			buttonSort.value = 'down';
		} else {
			buttonSort.value = 'up';
		}
	}
	drawTable();
}

function onClickSortEmail(buttonSort) {
	if (buttonSort.value === 'down') {
		sortedAsc = false;
	} else {
		sortedAsc = true;
	}
	sort = 'email';
	if (buttonSort) {
		if (sortedAsc) {
			buttonSort.value = 'down';
		} else {
			buttonSort.value = 'up';
		}
	}
	drawTable();
}

function onClickSortType(buttonSort) {
	if (buttonSort.value === 'down') {
		sortedAsc = false;
	} else {
		sortedAsc = true;
	}
	sort = 'typeName';
	if (buttonSort) {
		if (sortedAsc) {
			buttonSort.value = 'down';
		} else {
			buttonSort.value = 'up';
		}
	}
	drawTable();
}

function onClickButtonDelete() {
	userService.deleteUsers(getUserIds());
	drawTable();
}

function onClickRow(el) {
	el.classList.toggle('selectColor');
}

function getUserIds() {
	let selectedElem = document.getElementsByClassName('selectColor');
	let attribute;
	let arrOfAttribute = [];
	for (let i = 0; i < selectedElem.length; i++) {
		attribute = selectedElem[i].getAttribute('userId');
		arrOfAttribute[arrOfAttribute.length] = attribute;
	}
	return arrOfAttribute;
}

function createFormSaveNewEdit() {
	let tableForAdd = document.getElementById('tableNewUser');
	let newString = '';
	newString =
		newString +
		`<tr><td >User's name:</td><td><input type="text" value="" id="newName"></td></tr><tr><td>User's e-mail:</td><td><input type="text" value="" id="newEmail"></td></tr><tr><td>User's type:</td><td><select id="selectNewType"></select></td></tr><tr><button id="save" onclick = "onClickSave()">Save</button><button id="esc" onclick="onClickExit(this)">Exit</button></tr>`;
	tableForAdd.innerHTML = newString;
}

function onclickEdit(idSelected) {
	createFormSaveNewEdit();
	createDropDown('selectNewType');
	let idUser = parseInt(getUserIds(idSelected));
	let arrUser = userService.findUserById(idUser);
	let oldName = document.getElementById('newName');
	oldName.value = arrUser.nameUser;
	let oldEmail = document.getElementById('newEmail');
	oldEmail.value = arrUser.emailUser;
	let oldType = document.getElementById('selectNewType');
	oldType.value = arrUser.typeIdUser;
}

function onClickButtonAdd() {
	createFormSaveNewEdit();
	createDropDown('selectNewType');
	drawTable();
}

function onClickSave(id) {
	let idUser = parseInt(getUserIds(id));
	let arrData = userService.getUserData();
	let ind = arrData.findIndex((el) => {
		return el.id == idUser;
	});
	if (!!idUser) {
		let editName = document.getElementById('newName').value;
		let editType = document.getElementById('selectNewType').value;
		let editEMail = document.getElementById('newEmail').value;
		userService.saveEditUser(ind, idUser, editName, editType, editEMail);
		drawTable();
	} else {
		let newName = document.getElementById('newName');
		let newEmail = document.getElementById('newEmail');
		let newType = document.getElementById('selectNewType');
		userService.createNewUser(newName, newEmail, newType);
		drawTable();
	}
	document.getElementById('newName').value = null;
	document.getElementById('selectNewType').value = null;
	document.getElementById('newEmail').value = null;
}

function onClickExit() {
	let tableForAdd = document.getElementById('tableNewUser');
	tableForAdd.innerHTML = null;
	drawTable();
}
