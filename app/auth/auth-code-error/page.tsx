export default function AuthCodeError() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-center p-8 max-w-md">
                <h1 className="text-2xl font-bold text-foreground mb-4">
                    认证失败
                </h1>
                <p className="text-muted-foreground mb-6">
                    登录过程中出现问题，请重试。
                </p>
                <a
                    href="/"
                    className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                    返回首页
                </a>
            </div>
        </div>
    )
}
