import "./styles.css";
import { useEffect, useState } from "react";
import Amplify from "aws-amplify";
import { AmplifySignOut, AmplifyAuthenticator } from "@aws-amplify/ui-react";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
// import awsconfig from './aws-exports'

export const App = () => {
  /** ログインされているかどうか判断するためAuth*/
  const [authState, setAuthState] = useState();
  /**ユーザー情報を保持する */
  const [user, setUser] = useState();

  /**loginの状態に変更があった時にステートにセットする */
  useEffect(() => {
    /**アンマウント時に処理をクリアしたい */
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, []);
  /**authStateとAuthStateコンポーネントのSignedInの値が同じであり、
   * userが存在する時ログイン後の画面を表示する */
  return authState === AuthState.SignedIn && user ? (
    <div className="App">
      <AmplifySignOut />
      <h2>Component</h2>
    </div>
  ) : (
    <AmplifyAuthenticator />
  );
};
