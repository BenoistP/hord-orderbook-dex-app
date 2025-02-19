import * as S from './styles'

export type NavbarDropdownProps = {
  title: string
}

const NavbarDropdown = ({ title = 'NavbarDropdown' }: NavbarDropdownProps) => {
  return (
    <S.Wrapper>
      <S.Header>
        <S.Wrapper></S.Wrapper>
        <S.Title>{title}</S.Title>
        <S.WrapperImage>
          <S.Image src="/img/icons/ArrowTop.svg" />
        </S.WrapperImage>
      </S.Header>
      {/*{*/}
      {/*children && <S.WrapperContent className="animation">*/}
      {/*<S.ContainerContent>*/}
      {/*{children}*/}
      {/*</S.ContainerContent>*/}
      {/*</S.WrapperContent>*/}
      {/*}*/}
    </S.Wrapper>
  )
}

export default NavbarDropdown
