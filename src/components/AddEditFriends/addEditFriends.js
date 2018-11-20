import $ from 'jquery';
import authHelpers from '../../helpers/authHelpers';

const formBuilder = () => {
  const form = `
  <div class="form-group">
    <label for="form-friend-name">Name:</label>
    <input type="text" class="form-control" id"form-friend-name" placeholder="John Smith">
  </div>
  <div class="form-group">
    <label for="form-friend-address">Address:</label>
    <input type="text" class="form-control" id="form-friend-address" placeholder="500 Interstate Blv">
  </div>
  <div class="form-group">
  <label for="form-friend-email">Email:</label>
  <input type="text" class="form-control" id="form-friend-email" placeholder="fake@person.com">
</div>
<div class="form-group">
<label for="form-friend-phone">Phone Number:</label>
<input type="text" class="form-control" id="form-friend-phone" placeholder="555-595-5555">
</div>
<div class="form-group">
<label for="form-friend-relationship">Relationship:</label>
<input type="text" class="form-control" id="form-friend-relationship" placeholder="I don't know">
</div>
`;
};

const gettingFriendFromForm = () => {
  const friend = {
    name: $('#form-friend-name').val(),
    address: $('#form-friend-address').val(),
    email: $('#form-friend-email').val(),
    phone: $('#form-friend-phone').val(),
    relationship: $('#form-friend-relationship').val(),
    isAvoiding: false,
    uid: authHelpers.getCurrentUid()
  };
};
