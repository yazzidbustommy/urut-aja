import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContextProvider } from "./context/authContex";
import ProtectedRoute from "./pages/ProtecRoute";
import Unauthorized from "./pages/Unauthorized";
import {
  DASHBOARD_ADMIN_SIDEBAR_LINKS,
  DASHBOARD_EMPLOYE_SIDEBAR_LINKS,
} from "./consts/navigationSidebar";
import { Spinner } from "@nextui-org/react";
import RecruitmentInfo from "./pages/RecruitmentInfo";

const Home = React.lazy(() => import("./pages/Home"));
const AccountPage = React.lazy(() => import("./pages/admin pages/AccountPage"));
const RecruitmentPage = React.lazy(() =>
  import("./pages/admin pages/RecruitmentPage")
);
const Transaction = React.lazy(() => import("./pages/admin pages/Transaction"));
const AvailabilityPage = React.lazy(() =>
  import("./pages/employe pages/AvailabilityPage")
);
const EmployeTransaction = React.lazy(() =>
  import("./pages/employe pages/EmployeTransaction")
);
const AdminDashboard = React.lazy(() =>
  import("./pages/admin pages/AdminDasboard")
);
const EmployeDashboard = React.lazy(() =>
  import("./pages/employe pages/EmployeDashboard")
);
const OfferPage = React.lazy(() => import("./pages/employe pages/OfferPage"));
const BiddingFeedback = React.lazy(() =>
  import("./pages/customer pages/BiddingFeedback")
);
const WaitingApprovalPage = React.lazy(() =>
  import("./pages/employe pages/WaitingApprovalPage")
);
const BiddingPayment = React.lazy(() =>
  import("./pages/customer pages/BiddingPayment")
);
const IncomingMassage = React.lazy(() =>
  import("./pages/customer pages/IncomingMassage")
);
const FinishPayment = React.lazy(() =>
  import("./pages/employe pages/FinishPayment")
);

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route
          element={
            <Suspense
              fallback={
                <div className="flex justify-center items-center w-full h-screen">
                  <Spinner
                    label="Loading..."
                    color="success"
                    className="w-[50%]"
                  />
                </div>
              }
            >
              <Home />
            </Suspense>
          }
          path="/"
        />
        <Route element={<Unauthorized />} path="/unauthorized" />
        <Route
          element={
            <Suspense
              fallback={
                <div className="flex justify-center items-center w-full h-screen">
                  <Spinner
                    label="Loading..."
                    color="success"
                    className="w-[50%]"
                  />
                </div>
              }
            >
              <BiddingFeedback />
            </Suspense>
          }
          path="/BiddingFeedback"
        />
        <Route
          element={
            <Suspense
              fallback={
                <div className="flex justify-center items-center w-full h-screen">
                  <Spinner
                    label="Loading..."
                    color="success"
                    className="w-[50%]"
                  />
                </div>
              }
            >
              <BiddingPayment />
            </Suspense>
          }
          path="/BiddingPayment"
        />
        <Route
          element={
            <Suspense
              fallback={
                <div className="flex justify-center items-center w-full h-screen">
                  <Spinner
                    label="Loading..."
                    color="success"
                    className="w-[50%]"
                  />
                </div>
              }
            >
              <IncomingMassage />
            </Suspense>
          }
          path="/IncomingMassage"
        />
        <Route
          element={
            <Suspense
              fallback={
                <div className="flex justify-center items-center w-full h-screen">
                  <Spinner
                    label="Loading..."
                    color="success"
                    className="w-[50%]"
                  />
                </div>
              }
            >
              <RecruitmentInfo />
            </Suspense>
          }
          path="/recruitment-info"
        />

        {/* Admin Dashboard Routes */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute
              adminElement={
                <Suspense
                  fallback={
                    <div className="flex justify-center items-center w-full h-screen">
                      <Spinner
                        label="Loading..."
                        color="success"
                        className="w-[50%]"
                      />
                    </div>
                  }
                >
                  <AdminDashboard sidebarLink={DASHBOARD_ADMIN_SIDEBAR_LINKS} />
                </Suspense>
              }
              employeElement={<Navigate to="/unauthorized" />}
            />
          }
        >
          <Route
            index
            element={
              <ProtectedRoute
                adminElement={
                  <Suspense
                    fallback={
                      <div className="flex justify-center items-center w-full h-screen">
                        <Spinner
                          label="Loading..."
                          color="success"
                          className="w-[50%]"
                        />
                      </div>
                    }
                  >
                    <AccountPage />
                  </Suspense>
                }
                employeElement={<Navigate to="/unauthorized" />}
              />
            }
          />
          <Route
            element={
              <ProtectedRoute
                adminElement={
                  <Suspense
                    fallback={
                      <div className="flex justify-center items-center w-full h-screen">
                        <Spinner
                          label="Loading..."
                          color="success"
                          className="w-[50%]"
                        />
                      </div>
                    }
                  >
                    <RecruitmentPage />
                  </Suspense>
                }
                employeElement={<Navigate to="/unauthorized" />}
              />
            }
            path="recruitments-page"
          />
          <Route
            element={
              <ProtectedRoute
                adminElement={
                  <Suspense
                    fallback={
                      <div className="flex justify-center items-center w-full h-screen">
                        <Spinner
                          label="Loading..."
                          color="success"
                          className="w-[50%]"
                        />
                      </div>
                    }
                  >
                    <Transaction />
                  </Suspense>
                }
                employeElement={<Navigate to="/unauthorized" />}
              />
            }
            path="transactions-page"
          />
        </Route>

        {/* Employe Dashboard Routes */}
        <Route
          path="/employe-dashboard"
          element={
            <ProtectedRoute
              adminElement={<Navigate to="/unauthorized" />}
              employeElement={
                <Suspense
                  fallback={
                    <div className="flex justify-center items-center w-full h-screen">
                      <Spinner
                        label="Loading..."
                        color="success"
                        className="w-[50%]"
                      />
                    </div>
                  }
                >
                  <EmployeDashboard
                    sidebarLink={DASHBOARD_EMPLOYE_SIDEBAR_LINKS}
                  />
                </Suspense>
              }
            />
          }
        >
          <Route
            index
            element={
              <ProtectedRoute
                adminElement={<Navigate to="/unauthorized" />}
                employeElement={
                  <Suspense
                    fallback={
                      <div className="flex justify-center items-center w-full h-screen">
                        <Spinner
                          label="Loading..."
                          color="success"
                          className="w-[50%]"
                        />
                      </div>
                    }
                  >
                    <AvailabilityPage />
                  </Suspense>
                }
              />
            }
          />
          <Route
            element={
              <ProtectedRoute
                adminElement={<Navigate to="/unauthorized" />}
                employeElement={
                  <Suspense
                    fallback={
                      <div className="flex justify-center items-center w-full h-screen">
                        <Spinner
                          label="Loading..."
                          color="success"
                          className="w-[50%]"
                        />
                      </div>
                    }
                  >
                    <EmployeTransaction />
                  </Suspense>
                }
              />
            }
            path="employe-transactions-page"
          />
          <Route
            element={
              <ProtectedRoute
                adminElement={<Navigate to="/unauthorized" />}
                employeElement={
                  <Suspense
                    fallback={
                      <div className="flex justify-center items-center w-full h-screen">
                        <Spinner
                          label="Loading..."
                          color="success"
                          className="w-[50%]"
                        />
                      </div>
                    }
                  >
                    <OfferPage />
                  </Suspense>
                }
              />
            }
            path="employe-offer-page"
          />
        </Route>

        <Route
          element={
            <ProtectedRoute
              adminElement={<Navigate to="/unauthorized" />}
              employeElement={
                <Suspense
                  fallback={
                    <div className="flex justify-center items-center w-full h-screen">
                      <Spinner
                        label="Loading..."
                        color="success"
                        className="w-[50%]"
                      />
                    </div>
                  }
                >
                  <WaitingApprovalPage />
                </Suspense>
              }
            />
          }
          path="employe-waiting-approval-page"
        />
        <Route
          element={
            <ProtectedRoute
              adminElement={<Navigate to="/unauthorized" />}
              employeElement={
                <Suspense
                  fallback={
                    <div className="flex justify-center items-center w-full h-screen">
                      <Spinner
                        label="Loading..."
                        color="success"
                        className="w-[50%]"
                      />
                    </div>
                  }
                >
                  <FinishPayment />
                </Suspense>
              }
            />
          }
          path="finish-payment"
        />
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
