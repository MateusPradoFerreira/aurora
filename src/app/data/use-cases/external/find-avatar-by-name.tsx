export class FindAvatarByNameUseCase {
  
  static async execute(name: string): Promise<string> {
    const url = `https://www.gravatar.com/avatar/EMAIL_MD5?d=https%3A%2F%2Fui-avatars.com%2Fapi%2F/${name.split(" ").join("+")}/128/random/2/0.33`;
    return url;
  }

}