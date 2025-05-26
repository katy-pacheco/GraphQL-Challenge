import { useQuery } from '@apollo/client';
import { GET_CHARACTER_DETAIL } from './get-character-details.graphql';
import styles from './character-detail.module.css';
import Loading from '../../assets/loading.svg';

interface Props {
    characterId: string | null;
}

export default function CharacterDetail({ characterId }: Props) {
    const { data, loading, error } = useQuery(GET_CHARACTER_DETAIL, {
        variables: { id: characterId },
        skip: !characterId,
    });

    if (loading) {
        return (
            <div className={styles.loadingIcon}>
                <img src={Loading} alt="loading characters" />
                <p>Loading...</p>
            </div>
        );
    }

    if (error) {
        return <h2 className={styles.errorMessage}>Failed to Load Data</h2>;
    }

    if (!data || !data.character) return null;


    const character = data.character;
    const firstFiveEpisodes = character.episode.slice(0, 5);

    return (
        <div className={styles.detailContainer}>
            <h2 className={styles.title}>General Information</h2>
            <div className={styles.header}>
                <img src={character.image} alt={character.name} className={styles.image} />
                <h2 className={styles.title}>{character.name}</h2>
            </div>
            <div className={styles.contentCharacter}>
                <div className={styles.row}>
                    <span>Specie</span>
                    <span>{character.species}</span>
                </div>
                <div className={styles.row}>
                    <span>Status</span>
                    <span>{character.status}</span>
                </div>
                <div className={styles.row}>
                    <span>Gender</span>
                    <span>{character.gender}</span>
                </div>
                <div className={styles.row}>
                    <span>Origin</span>
                    <span>{character.origin.name}</span>
                </div>
                <div className={styles.row}>
                    <span>Location</span>
                    <span>{character.location.name}</span>
                </div>
            </div>
            <div className={styles.contentCharacter}>
                <h2 className={styles.title}>Episodes</h2>
                {firstFiveEpisodes.map((ep: { id: string, name: string }) => (
                    <div key={ep.id} className={styles.rowEpisode}>
                        <span className={styles.episode}>{ep.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
