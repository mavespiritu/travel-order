import React, { useState, useRef, useEffect } from 'react';
import Transition from '../../Transition';
import UserAvatar from '../../../images/user-avatar-32.png';
import ConfirmSignOutModal from './ConfirmSignOutModal';
//import ChangePassword from './ChangePassword';
import useStorage from '../../../hooks/useStorage';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { logout } from '../../../modules/UserManagement/Login/api';
import PrimaryButton from '../../Buttons/Primary';

const DropdownProfile = ({
  align
}) => {

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showConfirmSignOutModal, setShowConfirmSignOutModal] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false)

  const trigger = useRef(null);
  const signOutTrigger = useRef(null);
  const changePasswordTrigger = useRef(null);
  const dropdown = useRef(null);

  const navigate = useNavigate()
  
  const { mutate: signOut } = useMutation(logout, {
    onSuccess: () => {
      setShowConfirmSignOutModal(false)
      useStorage().reset()
      navigate('/login', {replace: true})

    }
  })


  const { first_name, last_name } = JSON.parse(useStorage().get())

  const profileName = `${first_name} ${last_name}`

  const confirmSignOut = () => {
    setShowConfirmSignOutModal(true)
    setDropdownOpen(false)
  }

  const handleChangePassword = () => {
    setShowChangePassword(true)
    setDropdownOpen(false)
  }

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <>
      <div className="relative inline-flex">
        <button
          ref={trigger}
          className="inline-flex justify-center items-center group"
          aria-haspopup="true"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          aria-expanded={dropdownOpen}
        >
          <div className="flex items-center truncate">
            <svg className="w-3 h-3 shrink-0 ml-1 fill-current text-slate-400" viewBox="0 0 12 12">
              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
            </svg>
            <span className="truncate ml-2 text-sm font-medium group-hover:text-slate-800 pr-2">{profileName}</span>
            <img className="w-8 h-8 rounded-full" src={UserAvatar} width="32" height="32" alt="User" />
          </div>
        </button>

        <Transition
          className={`origin-top-right z-10 absolute top-full min-w-44 bg-white border border-slate-200 py-1.5 rounded shadow-lg overflow-hidden mt-1 ${align === 'right' ? 'right-0' : 'left-0'}`}
          show={dropdownOpen}
          enter="transition ease-out duration-200 transform"
          enterStart="opacity-0 -translate-y-2"
          enterEnd="opacity-100 translate-y-0"
          leave="transition ease-out duration-200"
          leaveStart="opacity-100"
          leaveEnd="opacity-0"
        >
          <div
            ref={dropdown}
            onFocus={() => setDropdownOpen(true)}
            onBlur={() => setDropdownOpen(false)}
          >
            <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-slate-200">
              <div className="font-medium text-slate-800">{profileName}</div>
              <div className="text-xs text-slate-500 italic">{'test'}</div>
            </div>
            <ul>
              <li>
                <button
                  ref={changePasswordTrigger}
                  className="font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3"
                  onClick={handleChangePassword}
                >
                  Change Password
                </button>
              </li>
              <li>
                <button
                  ref={signOutTrigger}
                  className="font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3"
                  onClick={confirmSignOut}
                >
                  Sign Out
                </button>
              </li>
            </ul>
          </div>
        </Transition>
        <ConfirmSignOutModal
          id="signout-modal"
          modalOpen={showConfirmSignOutModal}
          setModalOpen={setShowConfirmSignOutModal}
          title="Confirm Sign Out"
          trigger={signOutTrigger}
        >
          {/* Modal content */}
          <div className="px-5 pt-4 pb-1">
            <div className="text-sm">
              <div className="font-medium text-slate-800 mb-2">Are you sure you want to sign out?</div>
            </div>
          </div>
          {/* Modal footer */}
          <div className="px-5 py-4">
            <div className="flex flex-wrap justify-end space-x-2">
              <button className="btn-sm border-slate-200 hover:border-slate-300 text-slate-600" onClick={(e) => { e.stopPropagation(); setShowConfirmSignOutModal(false); }}>Cancel</button>
                <PrimaryButton 
                    label={"Ok"}
                    submitting={false}
                    handleClick={signOut} 
                />
            </div>
          </div>
        </ConfirmSignOutModal>
        {/* <ChangePassword
          open={showChangePassword}
          setOpen={setShowChangePassword}
          trigger={changePasswordTrigger}
        /> */}
      </div>
    </>
  )
}

export default DropdownProfile