import $ from 'jquery';
import authHelpers from '../../helpers/authHelpers';
import friendsData from '../../helpers/data/friendsData';
import holidayFriendsData from '../../helpers/data/holidayFriendsData';
import holidaysData from '../../helpers/data/holidaysData';


const holidayStringBuilder = (holidays) => {
  let holidayString = '<h3>Holidays:</h3>';
  holidays.forEach((holiday) => {
    holidayString += `<h5>${holiday.name} ${holiday.Date}</h5>`;
  });
  return holidayString;
};
const printSingleFriend = (friend, holidays) => {
  const friendString = `
  <div>
      <h1>${friend.name}</h1>
      <h3>${friend.relationship}</h3>
      <p>${friend.address}</p>
      <p>${friend.email}</p>
      <p>${friend.phoneNumber}</p>
      <div class="form-check form-check-inline">
        <label class="form-check-label" for="inlineCheckbox1">Am I avoiding them?</label>
        <input class="form-check-input is-avoiding-checkbox" type="checkbox" id="${friend.id}" value="option1">
      </div>
      <button class = "btn btn-danger delete-btn" data-delete-id=${friend.id}>X</button> 
      <button class = "btn btn-info edit-btn" data-edit-id=${friend.id}>Edit</button>        
      <div class = "holiday-containter">${holidayStringBuilder(holidays)}</div> 
  </div>
    `;
  $('#single-container').html(friendString);
  if (friend.isAvoiding) {
    $('.is-avoiding-checkbox').attr('checked', true);
  }
};


const getSingleFriend = (e) => {
  const friendId = e.target.dataset.dropdownId;
  const uid = authHelpers.getCurrentUid();
  friendsData.getSingleFriend(friendId).then((singleFriend) => {
    holidayFriendsData.getHolidayIdsForFriend(friendId).then((holidayIds) => {
      console.log('holidayIds', holidayIds);
      holidaysData.getHolidaysByArrayOfIds(uid, holidayIds).then((holidays) => {
        printSingleFriend(singleFriend, holidays);
      });
    });
  })
    .catch((error) => {
      console.error('error in getting one friend', error);
    });
};

const buildDropDown = (friendsArray) => {
  let dropdown = `<div class="dropdown">
    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      Pick a Friend
    </button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">`;
  if (friendsArray.length) {
    friendsArray.forEach((friend) => {
      dropdown += `<div class="dropdown-item get-single" data-dropdown-id=${friend.id}>${friend.name}</div>`;
    });
  } else {
    dropdown += '<div class = "dropdown-item">You have no friends.</div>';
  }
  dropdown += '</div></div>';
  $('#dropdown-container').html(dropdown);
};

const friendsPage = () => {
  const uid = authHelpers.getCurrentUid();
  friendsData.getAllFriends(uid)
    .then((friendsArray) => {
      buildDropDown(friendsArray);
    })
    .catch((error) => {
      console.error('error in getting friends', error);
    });
};

const deleteFriend = (e) => {
  const idToDelete = e.target.dataset.deleteId;
  friendsData.deleteFriend(idToDelete)
    .then(() => {
      friendsPage();
      $('#single-container').html('');
    })
    .catch((error) => {
      console.error('error in deleting friend', error);
    });
};

const updateIsAvoiding = (e) => {
  const friendId = e.target.id;
  const isAvoiding = e.target.checked;
  friendsData.updateIsAvoiding(friendId, isAvoiding)
    .then(() => {

    })
    .catch((err) => {
      console.log('error in updating flag', err);
    });
};

const bindEvents = () => {
  $('body').on('click', '.get-single', getSingleFriend);
  $('body').on('click', '.delete-btn', deleteFriend);
  $('body').on('change', '.is-avoiding-checkbox', updateIsAvoiding);
};

const initializeFriendsPage = () => {
  friendsPage();
  bindEvents();
};

export default initializeFriendsPage;
