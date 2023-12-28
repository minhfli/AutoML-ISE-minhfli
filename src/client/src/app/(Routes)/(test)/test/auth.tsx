type User = {
    username: string;
    password: string;
};

export function RandomAuth(user: User): Promise<boolean> {
    const db = [
        {
            username: 'admin',
            password: 'admin'
        },
        {
            username: 'user',
            password: 'user'
        }, {
            username: 'test',
            password: 'test'
        }
    ];
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (db.some((u) => u.username === user.username && u.password === user.password)) {
                resolve(true);
            } else {
                reject(new Error('Invalid credentials'));
            }
        }, Math.random() * 1000);
    });
}