import  { useState } from 'react';
import { appleImg, bagImg, searchImg } from '../utils';
import { navLists } from '../constants';

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [primaryRole, setPrimaryRole] = useState('');
  const [selections, setSelections] = useState([{ role: '', experience: '' }]);

  const roles = ['Developer', 'UX/UI', 'AI Engineer', 'Data Analyst'];
  const experienceOptions = ['0-2 years', '2-5 years', '5+ years'];

  const handleAddSelection = () => {
    setSelections([...selections, { role: '', experience: '' }]);
  };

  const handleRemoveSelection = (index) => {
    const updated = [...selections];
    updated.splice(index, 1);
    setSelections(updated);
  };

  const handleSelectionChange = (index, field, value) => {
    const updated = [...selections];
    updated[index][field] = value;
    setSelections(updated);
  };

  const handleSubmit = () => {
    const data = {
      primaryRole,
      selections,
    };

    console.log('Submitted Data:', JSON.stringify(data, null, 2));

    // Reset and close modal
    setPrimaryRole('');
    setSelections([{ role: '', experience: '' }]);
    setShowModal(false);

    // Show confirmation
    setShowConfirmation(true);

    // Auto-hide confirmation after 3 seconds
    setTimeout(() => {
      setShowConfirmation(false);
    }, 3000);
  };

  return (
    <>
      <header className="w-full py-5 sm:px-10 px-5 flex justify-between items-center">
        <nav className="flex w-full screen-max-width">
          <img src={appleImg} alt="Apple" width={14} height={18} />

          <div className="flex flex-1 justify-center max-sm:hidden">
            {navLists.map((nav) => (
              <div
                key={nav}
                className="px-5 text-sm cursor-pointer text-gray hover:text-white transition-all"
              >
                {nav}
              </div>
            ))}
          </div>

          <div className="flex items-baseline gap-5 max-sm:justify-end max-sm:flex-1">
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 text-white text-sm px-4 py-1.5 rounded hover:bg-blue-700"
            >
              Hire
            </button>
            <img src={searchImg} alt="Search" width={18} height={18} />
            <img src={bagImg} alt="Bag" width={18} height={18} />
          </div>
        </nav>
      </header>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-black text-white p-6 rounded-lg w-[90%] max-w-md shadow-lg relative border border-gray-700">
            <h2 className="text-lg font-semibold mb-4">Select Role</h2>

            {/* Primary Role Selection */}
            <div className="mb-4">
              <label className="block mb-1 text-sm">Primary Role</label>
              <select
                className="w-full border border-gray-600 bg-transparent text-white p-2 rounded"
                value={primaryRole}
                onChange={(e) => setPrimaryRole(e.target.value)}
              >
                <option value="" className="bg-black text-white">Select</option>
                {roles.map((role) => (
                  <option key={role} value={role} className="bg-black text-white">
                    {role}
                  </option>
                ))}
              </select>
            </div>

            {/* Multiple Selections */}
            {selections.map((selection, index) => (
              <div key={index} className="mb-4 border-b border-gray-700 pb-3">
                <div className="flex gap-2 mb-2">
                  <select
                    className="flex-1 border border-gray-600 bg-transparent text-white p-2 rounded"
                    value={selection.role}
                    onChange={(e) =>
                      handleSelectionChange(index, 'role', e.target.value)
                    }
                  >
                    <option value="" className="bg-black text-white">Role</option>
                    {roles.map((role) => (
                      <option key={role} value={role} className="bg-black text-white">
                        {role}
                      </option>
                    ))}
                  </select>

                  <select
                    className="flex-1 border border-gray-600 bg-transparent text-white p-2 rounded"
                    value={selection.experience}
                    onChange={(e) =>
                      handleSelectionChange(index, 'experience', e.target.value)
                    }
                  >
                    <option value="" className="bg-black text-white">Experience</option>
                    {experienceOptions.map((exp) => (
                      <option key={exp} value={exp} className="bg-black text-white">
                        {exp}
                      </option>
                    ))}
                  </select>

                  {selections.length > 1 && (
                    <button
                      onClick={() => handleRemoveSelection(index)}
                      className="text-red-400 font-bold"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            ))}

            <button
              onClick={handleAddSelection}
              className="text-sm text-blue-400 hover:underline mb-4"
            >
              + Add More
            </button>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-700 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Screen */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-green-600 text-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-lg font-semibold mb-2">Success!</h2>
            <p>Your response has been submitted.</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;

