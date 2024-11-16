interface LoginProps {
    userNameParam: string
    onUserName: (val: string) => Promise<void>
    password: string
    onPassword: (val: string) => Promise<void>
    onLogin: () => Promise<void>
}

const LoginPresenter = ( { userNameParam, onUserName, password, onPassword, onLogin }: LoginProps  ) => {
    return (
        <>
            <div className="row mb-3">
                <div className="col-2"></div>
                <div className="col-1">User</div>
                <div className="col-5">
                    <input type="text" className="form-control" value={userNameParam} onChange={(e) => onUserName(e.target.value)} />
                </div>
                <div className="col-2"></div>
            </div>
            <div className="row mb-3">
                <div className="col-2"></div>
                <div className="col-1">Password</div>
                <div className="col-5">
                    <input type="password" className="form-control" value={password} onChange={(e) => onPassword(e.target.value) } />
                </div>
                <div className="col-2"></div>
            </div>
            <div className="row">
                <div className="col-3"></div>
                <input type="button" className="btn btn-primary col-6" value={"Login"} onClick={() => onLogin()} />
                <div className="col-3"></div>
            </div>
        </>
    )
}

export default LoginPresenter