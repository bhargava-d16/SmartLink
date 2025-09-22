const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export default logout;
