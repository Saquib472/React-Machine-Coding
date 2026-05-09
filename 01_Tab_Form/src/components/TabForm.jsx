import { useState } from "react";
import Interests from "./Interests";
import Profile from "./Profile";
import Settings from "./Settings";

const TabForm = () => {
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    name: "",
    age: 18,
    email: "",
    interests: ["coding"],
    theme: "light",
  });
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    {
      name: "Profile",
      component: Profile,
      validate: () => {
        const err = {};
        if (!data.name || data.name.length < 2) {
          err.name = "Name is not valid";
        }
        if (!data.age || data.age < 18) {
          err.age = "Age is not valid";
        }
        if (!data.email) {
          err.email = "Email is not Valid";
        }
        setErrors(err);
        return err.name || err.age || err.email ? false : true;
      },
    },
    {
      name: "Interests",
      component: Interests,
      validate: () => {
        const err = {};
        if (data.interests.length < 1) {
          err.interests = "Please Select atleast One Interest";
        }
        setErrors(err);
        return err.interests ? false : true;
      },
    },
    {
      name: "Settings",
      component: Settings,
      validate : ()=>{
        return true
      }
    },
  ];
  const ActiveTabBody = tabs[activeTab].component;
  const handlePrevBtn = () => {
    if (tabs[activeTab].validate())
      setActiveTab(activeTab - 1);
  };
  const handleNextBtn = () => {
    if (tabs[activeTab].validate()) setActiveTab(activeTab + 1);
  };
  return (
    <>
      <div className="tab-heading">
        {tabs.map((tab, index) => {
          return (
            <div
              className={`${activeTab === index ? "heading active-tab" : "heading"}`}
              key={index}
              onClick={() => {
                if (tabs[activeTab].validate())
                  setActiveTab(index);
              }}
            >
              {tab.name}
            </div>
          );
        })}
      </div>
      <div className="section-body">
        <ActiveTabBody data={data} setData={setData} errors={errors} />
      </div>
      {activeTab > 0 && <button onClick={handlePrevBtn}>Prev</button>}
      {activeTab < tabs.length - 1 && (
        <button onClick={handleNextBtn}>Next</button>
      )}
      {activeTab === tabs.length - 1 && <button>Submit</button>}
    </>
  );
};

export default TabForm;
